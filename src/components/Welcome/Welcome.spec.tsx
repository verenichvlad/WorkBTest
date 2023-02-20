import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Welcome from './Welcome'

it('shows the welcome text', () => {
  const { getByText } = render(<Welcome />);
  expect(getByText('Front End Technical Test')).toBeInTheDocument();
})