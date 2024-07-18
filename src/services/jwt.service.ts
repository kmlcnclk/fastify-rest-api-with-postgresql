import JwtRepository from "../repositories/jwt.repository";
import { IJwt } from "../types/jwt .type";

class JwtService {
  private jwtRepository: JwtRepository;

  constructor() {
    this.jwtRepository = new JwtRepository();
  }

  public getJwts = async (): Promise<IJwt[]> => {
    return await this.jwtRepository.getJwts();
  };

  public createJwt = async ({ token }: { token: string }): Promise<IJwt> => {
    return await this.jwtRepository.createJwt({ token });
  };
}

export default JwtService;
