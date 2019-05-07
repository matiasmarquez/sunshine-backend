import { InscriptionInstallmentCreateInput } from 'graphql.schema';
import { Inscription } from 'modules/inscription/inscription/inscription.entity';

export class InscriptionInstallmentCreateDTO extends InscriptionInstallmentCreateInput {
	inscription?: Inscription;
}
