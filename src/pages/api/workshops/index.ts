import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { workshopValidationSchema } from 'validationSchema/workshops';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getWorkshops();
    case 'POST':
      return createWorkshop();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getWorkshops() {
    const data = await prisma.workshop
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'workshop'));
    return res.status(200).json(data);
  }

  async function createWorkshop() {
    await workshopValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.cart_item?.length > 0) {
      const create_cart_item = body.cart_item;
      body.cart_item = {
        create: create_cart_item,
      };
    } else {
      delete body.cart_item;
    }
    if (body?.certificate?.length > 0) {
      const create_certificate = body.certificate;
      body.certificate = {
        create: create_certificate,
      };
    } else {
      delete body.certificate;
    }
    const data = await prisma.workshop.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
