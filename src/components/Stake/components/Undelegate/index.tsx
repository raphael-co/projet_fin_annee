import React, { FC, ChangeEvent, MouseEvent, useState } from 'react';

import { Formik } from 'formik';
import { object } from 'yup';
import Action, { Submit } from 'components/Action';
import { undelegateValidator } from 'components/Stake//helpers/delegationValidators';
import useStakeData from 'components/Stake/hooks';
import { network } from 'config';
import { useGlobalContext } from 'context';

import { denominated } from 'helpers/denominate';
import modifiable from 'helpers/modifiable';
import { translate } from 'locale/local';

import styles from './styles.module.scss';

const Undelegate: FC = () => {
  const { userActiveStake } = useGlobalContext();
  const { onUndelegate } = useStakeData();
  const [maxed, setMaxed] = useState<boolean>(false);
  return (
    <div className={`${styles.wrapper} undelegate-wrapper`}>
      <Action
        title={translate('Undelegate_Now', localStorage.getItem('langage'))}
        description={
          translate(
            'Undelegate_Now_Description_Start',
            localStorage.getItem('langage')
          ) +
          ' ' +
          network.egldLabel +
          ' ' +
          translate(
            'Undelegate_Now_Description_End',
            localStorage.getItem('langage')
          )
        }
        trigger={
          <div className={styles.trigger}>
            {' '}
            {translate('Undelegate', localStorage.getItem('langage'))}
          </div>
        }
        render={
          <div className={styles.undelegate}>
            <Formik
              validationSchema={object().shape({
                amount: undelegateValidator(userActiveStake.data || '')
              })}
              onSubmit={onUndelegate}
              initialValues={{
                amount: '1'
              }}
            >
              {({
                errors,
                values,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue
              }) => {
                const amount = denominated(userActiveStake.data || '', {
                  addCommas: false,
                  showLastNonZeroDecimal: true
                });

                const onChange = (
                  event: ChangeEvent<HTMLInputElement>
                ): void => {
                  handleChange(event);
                  setMaxed(false);
                };
                const onMax = (event: MouseEvent): void => {
                  event.preventDefault();
                  setMaxed(true);
                  setFieldValue('amount', amount);
                };

                return (
                  <form onSubmit={handleSubmit}>
                    <div className={styles.field}>
                      <label htmlFor='amount'>
                        {network.egldLabel}{' '}
                        {translate('Amount', localStorage.getItem('langage'))}
                      </label>
                      <div className={styles.group}>
                        <input
                          type='number'
                          name='amount'
                          step='any'
                          required={true}
                          autoComplete='off'
                          min={1}
                          className={modifiable(
                            'input',
                            [errors.amount && touched.amount && 'invalid'],
                            styles
                          )}
                          value={maxed ? amount : values.amount}
                          onBlur={handleBlur}
                          onChange={onChange}
                        />

                        <a href='/#' onClick={onMax} className={styles.max}>
                          Max
                        </a>
                      </div>

                      <span className={styles.description}>
                        <span>Balance:</span>{' '}
                        {denominated(userActiveStake.data || '')}{' '}
                        {network.egldLabel}
                      </span>

                      {errors.amount && touched.amount && (
                        <span className={styles.error}>{errors.amount}</span>
                      )}
                    </div>
                    {/* {ButtonUndelegate(Number(values.amount))} */}
                    <Submit save='Continue' />
                  </form>
                );
              }}
            </Formik>
          </div>
        }
      />
    </div>
  );
};

export default Undelegate;