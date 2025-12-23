import { FormattedMessage, useIntl } from '@edx/frontend-platform/i18n';
import { Button, Stack, Stepper } from '@openedx/paragon';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import { CheckoutPageRoute, CheckoutStepKey } from '@/constants/checkout';

const AcademicSelection = () => {
  const intl = useIntl();
  const eventKey = CheckoutStepKey.AcademicSelection;
  const navigate = useNavigate();
  return (
    <>
      <Helmet
        title={intl.formatMessage({
          id: 'AcademicSelection.title',
          defaultMessage: 'Academic Selection',
        })}
      />

      <Stack gap={4}>
        <Stepper.Step
          eventKey={eventKey}
          title="Academic Selection"
        >
          <Stack gap={3}>
            <h3>
              <FormattedMessage
                id="AcademicSelection.header"
                defaultMessage="Academic Selection"
              />
            </h3>

            <p>
              <FormattedMessage
                id="AcademicSelection.comingSoon"
                defaultMessage="Coming soon, we will update you."
              />
            </p>
          </Stack>
        </Stepper.Step>

        <Stepper.ActionRow eventKey={eventKey}>
          <Button
            variant="outline-primary"
            onClick={() => navigate(CheckoutPageRoute.PlanDetails)}
          >
            <FormattedMessage
              id="checkout.continue"
              defaultMessage="Continue"
            />
          </Button>

          <Stepper.ActionRow.Spacer />
        </Stepper.ActionRow>
      </Stack>
    </>
  );
};

export default AcademicSelection;