import React from 'react';
import { screen, render, fireEvent, cleanup } from '@testing-library/react';

import { ThemeProvider, Button } from '../..';

import Dialog from '.';

describe('<Dialog />', () => {
  afterEach(cleanup);

  it('should match snapshot', () => {
    const { baseElement } = render(
      <ThemeProvider>
        <Dialog isOpen>
          <Dialog.Header>Title</Dialog.Header>
          <Dialog.Content>Subtitle</Dialog.Content>
          <Dialog.Footer>
            <Button secondary>Ok, got it</Button>
          </Dialog.Footer>
        </Dialog>
      </ThemeProvider>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('should match snapshot with close button', () => {
    const { baseElement } = render(
      <ThemeProvider>
        <Dialog isOpen onClose={jest.fn()}>
          <Dialog.Header>Title</Dialog.Header>
          <Dialog.Content>Subtitle</Dialog.Content>
          <Dialog.Footer>
            <Button secondary>Ok, got it</Button>
          </Dialog.Footer>
        </Dialog>
      </ThemeProvider>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('should render a minimal dialog', () => {
    const onActionMock = jest.fn();

    render(
      <ThemeProvider>
        <Dialog isOpen>
          <Dialog.Header>Title</Dialog.Header>
          <Dialog.Content>Subtitle</Dialog.Content>
          <Dialog.Footer>
            <Button onClick={onActionMock} secondary>
              Ok, got it
            </Button>
          </Dialog.Footer>
        </Dialog>
      </ThemeProvider>,
    );

    screen.getByText('Title');
    screen.getByText('Subtitle');

    const button = screen.getByRole('button', { name: /Ok, got it/i });

    fireEvent.click(button);

    expect(onActionMock).toHaveBeenCalledTimes(1);
  });

  it('should render with close button', () => {
    const onCloseMock = jest.fn();

    render(
      <ThemeProvider>
        <Dialog isOpen onClose={onCloseMock}>
          <Dialog.Header>Title</Dialog.Header>
        </Dialog>
      </ThemeProvider>,
    );
    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
