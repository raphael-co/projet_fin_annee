import BigNumber from 'bignumber.js';
import { string } from 'yup';
import { network } from 'config';

const undelegateValidator = (input: string) =>
  string()
    .required('Required')
    .test(
      'minimum',
      'Value must be greater than or equal to 1.',
      (value = '0') => new BigNumber(value).isGreaterThanOrEqualTo(1)
    )
    .test(
      'maximum',
      `You need to set a value under ${input} ${network.egldLabel}.`,
      (value = '0') => parseFloat(value) <= parseFloat(input)
    )
    .test(
      'Minimum in the contract',
      `il doit y avoir minimum 1 ${network.egldLabel} stake sur le contrat`,
      (value = '0') =>
        new BigNumber(0.999999999999999999).isLessThan(
          new BigNumber(input).minus(new BigNumber(value))
        ) ||
        new BigNumber(0.000000000000000001).isGreaterThan(
          new BigNumber(input).minus(new BigNumber(value))
        )
    );

export { undelegateValidator };
