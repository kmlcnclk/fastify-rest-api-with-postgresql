import { FastifyReply, FastifyRequest } from "fastify";

class JwtMiddleware {
  public isAccessTokenValid = async (
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> => {
    const payload = await request.jwtVerify();

    request.user = payload;
  };
}

export default JwtMiddleware;
