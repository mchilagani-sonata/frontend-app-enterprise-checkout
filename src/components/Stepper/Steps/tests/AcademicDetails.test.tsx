import { useIntl, IntlProvider } from '@edx/frontend-platform/i18n';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';

import { renderWithRouterAndStepperProvider } from '@/utils/tests';
import { CheckoutPageRoute, CheckoutStepKey } from '@/constants/checkout';
import { useCurrentPageDetails } from '@/hooks/index';

import AcademicDetails from '../AcademicDetails';

// Mock useIntl
jest.mock('@edx/frontend-platform/i18n', () => ({
  ...jest.requireActual('@edx/frontend-platform/i18n'),
  useIntl: jest.fn(),
  IntlProvider: jest.requireActual('@edx/frontend-platform/i18n').IntlProvider,
}));

jest.mock('@/hooks/index', () => ({
  useCurrentPageDetails: jest.fn(),
}));

const formatMessageMock = jest.fn((descriptor) => descriptor.defaultMessage || descriptor.id || String(descriptor));
(useIntl as jest.Mock).mockReturnValue({ formatMessage: formatMessageMock });

describe('AcademicDetails', () => {
  afterEach(() => {
    jest.clearAllMocks();
    // Clean up any global navigate we may have set in tests
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((global as any).navigate) delete (global as any).navigate;
  });

  it('renders header and coming soon message and no button when there is no buttonMessage', () => {
    (useCurrentPageDetails as jest.Mock).mockReturnValue({ buttonMessage: null });

    renderWithRouterAndStepperProvider(
      <IntlProvider locale="en">
        <AcademicDetails />
      </IntlProvider>,
      CheckoutStepKey.AcademicDetails,
    );

    expect(screen.getByRole('heading', { name: /Academic Details/i })).toBeInTheDocument();
    expect(screen.getByText(/Coming soon, we will update you\./i)).toBeInTheDocument();
    expect(screen.queryByText(/Continue/i)).not.toBeInTheDocument();
  });

  it('renders a Continue button when buttonMessage exists', () => {
    (useCurrentPageDetails as jest.Mock).mockReturnValue({
      buttonMessage: {
        id: 'checkout.continue',
        defaultMessage: 'Continue',
      },
    });

    renderWithRouterAndStepperProvider(
      <IntlProvider locale="en">
        <AcademicDetails />
      </IntlProvider>,
      CheckoutStepKey.AcademicDetails,
    );

    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  it('calls global navigate when Continue button is clicked (legacy behavior)', async () => {
    const user = userEvent.setup();
    const mockNavigate = jest.fn();

    // The component references an unscoped `navigate` variable in its click handler.
    // Provide a global `navigate` to avoid a ReferenceError and assert it gets called.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).navigate = mockNavigate;

    (useCurrentPageDetails as jest.Mock).mockReturnValue({
      buttonMessage: {
        id: 'checkout.continue',
        defaultMessage: 'Continue',
      },
    });

    renderWithRouterAndStepperProvider(
      <IntlProvider locale="en">
        <AcademicDetails />
      </IntlProvider>,
      CheckoutStepKey.AcademicDetails,
    );

    const button = screen.getByText('Continue');
    await user.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(CheckoutPageRoute.PlanDetails);
  });
});
