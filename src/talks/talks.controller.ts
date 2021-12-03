import { Controller } from '@nestjs/common';
import { TalksGateway } from './talks.gateway';

@Controller('talks')
export class TalksController {
  constructor(private TalksGateway: TalksGateway) {}


}
