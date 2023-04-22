import { render } from '@testing-library/react';

import CardButton from './card-button';

describe('CardButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CardButton />);
    expect(baseElement).toBeTruthy();
  });
});
