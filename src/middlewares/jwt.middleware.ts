import { FastifyReply, FastifyRequest } from "fastify";

class JwtMiddleware {
  public async isAccessTokenValid(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const payload = await request.jwtVerify();

    request.user = payload;
  }
}

export default JwtMiddleware;
