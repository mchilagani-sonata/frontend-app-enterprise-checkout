import {
  CompanyNameField,
  CustomUrlField,
} from '@/components/FormFields';

import type { UseFormReturn } from 'react-hook-form';

interface AcademicContentProps {
  form: UseFormReturn<AcademicSelectionData>;
}

const AcademicSelectionContent = ({ form }: AcademicContentProps) => (
  <>
    <CompanyNameField form={form} />
    <CustomUrlField form={form} />
  </>
);

export default AcademicSelectionContent;