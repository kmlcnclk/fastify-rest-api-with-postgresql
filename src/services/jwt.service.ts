import JwtRepository from "../repositories/jwt.repository";
import { IJwt } from "../types/jwt .type";

class JwtService {
  private jwtRepository: JwtRepository;

  constructor() {
    this.jwtRepository = new JwtRepository();

    this.getJwts = this.getJwts.bind(this);
    this.createJwt = this.createJwt.bind(this);
  }

  public async getJwts(): Promise<IJwt[]> {
    return await this.jwtRepository.getJwts();
  }

  public async createJwt({ token }: { token: string }): Promise<IJwt> {
    return await this.jwtRepository.createJwt({ token });
  }
}

export default JwtService;
