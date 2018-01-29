import { geopointers } from '../Interfaces/geopointers.interface';
import { participant } from '../Interfaces/participant.interface';
import { scorecard } from '../Interfaces/scorecard.interface';
import { RootObject } from '../Interfaces/browserRoot.interface';
import { addrCords } from '../Interfaces/addrCords.interface';

export interface DbParticipant extends geopointers, participant, scorecard, RootObject, addrCords
{
    somevalue: boolean;

}