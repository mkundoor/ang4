import { Injectable } from '@angular/core';
import { Imember } from '../interfaces/member.interface';

@Injectable()
export class TrackByService {

    customer(index: number, member: Imember) {
        return member.particpantId;
    }

}