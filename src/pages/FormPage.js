import React, { useCallback, useState } from 'react';
import { FormInput } from 'components';
import {
  checkFieldValidity,
  formatCreditCardNumber,
  formatExpiryDate
} from 'utility';
import { FORM_FIELDS } from 'utility/constants';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { PageLayout } from 'layouts/PageContainer';
import { useForm } from 'utility/useForm';
import { ReactComponent as Spinner } from 'assets/img/pulse.svg';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'utility/useAuth';

function FormPage() {
  const [form, setForm] = useState({ ...FORM_FIELDS });
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const history = useHistory();

  const validateForm = useCallback(formObj => {
    return checkFieldValidity(formObj);
  }, []);

  const updateForm = useForm(form, setForm, validateForm);

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      login({ name: form.fullName.value });
      setForm({ ...FORM_FIELDS });
      history.push('/welcome');
    }, 3000);
  };

  return (
    <PageLayout className="form-page">
      <Container>
        <form className="form">
          <h3 className="heading">Front End Assessment</h3>
          <Row>
            <Col md={6}>
              <FormInput
                type="text"
                id="fullName"
                label="Full Name"
                value={form.fullName.value}
                onChange={e => updateForm(e.target.value, 'fullName')}
                error={form.fullName.error}
                touched={form.fullName.touched}
              />
            </Col>

            <Col md={6}>
              <FormInput
                type="email"
                id="email"
                label="Email Address"
                value={form.email.value}
                onChange={e => updateForm(e.target.value, 'email')}
                error={form.email.error}
                touched={form.email.touched}
              />
            </Col>
            <Col md={6}>
              <FormInput
                type="tel"
                id="phoneNumber"
                label="Phone Number"
                value={form.phoneNumber.value}
                onChange={e => updateForm(e.target.value, 'phoneNumber')}
                error={form.phoneNumber.error}
                touched={form.phoneNumber.touched}
              />
            </Col>
            <Col md={6}>
              <FormInput
                type="password"
                label="Password"
                id="password"
                value={form.password.value}
                onChange={e => updateForm(e.target.value, 'password')}
                error={form.password.error}
                touched={form.password.touched || form.confirmPassword.touched}
              />
            </Col>
            <Col md={6}>
              <FormInput
                type="password"
                label="Confirm Password"
                id="confirmPassword"
                value={form.confirmPassword.value}
                onChange={e => updateForm(e.target.value, 'confirmPassword')}
                error={form.confirmPassword.error}
                touched={form.confirmPassword.touched || form.password.touched}
              />
            </Col>
            <Col md={6}>
              <FormInput
                type="text"
                label="Credit / Debit Card Number"
                id="cardNumber"
                value={form.cardNumber.value}
                onChange={e =>
                  updateForm(
                    formatCreditCardNumber(e.target.value),
                    'cardNumber'
                  )
                }
                maxlength={19}
                minLength={19}
                error={form.cardNumber.error}
                touched={form.cardNumber.touched}
              />
            </Col>
            <Col md={6}>
              <FormInput
                type="text"
                label="Expiration Date"
                id="expirationDate"
                value={form.expirationDate.value}
                onChange={e =>
                  updateForm(formatExpiryDate(e.target.value), 'expirationDate')
                }
                error={form.expirationDate.error}
                touched={form.expirationDate.touched}
              />
            </Col>
            <Col md={6}>
              <FormInput
                type="password"
                label="Pin"
                id="pin"
                maxlength={4}
                value={form.pin.value}
                onChange={e => updateForm(e.target.value, 'pin')}
                error={form.pin.error}
                touched={form.pin.touched}
              />
            </Col>
          </Row>

          <Button
            className="button"
            onClick={handleSubmit}
            disabled={form.invalid || loading}
          >
            Submit{' '}
            {loading && (
              <Spinner height={30} width={50} preserveAspectRatio="none" />
            )}
          </Button>
        </form>
      </Container>
    </PageLayout>
  );
}

export default FormPage;
