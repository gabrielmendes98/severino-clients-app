import React from 'react';
import { View } from 'react-native';
import { rawRender, fireEvent } from 'test-utils';
import theme from 'common/styles/theme';
import Button from '../index';

it('should display children as text', () => {
  const testText = 'button test';
  const { getByText } = rawRender(<Button>{testText}</Button>);
  expect(getByText(testText)).toBeTruthy();
});

it('should change background color when variant is contained', () => {
  const { getByTestId } = rawRender(
    <Button variant="contained" color="red" testID="button">
      children
    </Button>,
  );
  expect(getByTestId('button-view')).toHaveStyle({
    backgroundColor: theme.colors.red,
  });
});

it('should have transparent background when variant is outlined', () => {
  const { getByTestId } = rawRender(
    <Button variant="outlined" color="red" testID="button">
      children
    </Button>,
  );
  expect(getByTestId('button-view')).toHaveStyle({
    backgroundColor: 'transparent',
  });
});

it('should change text color when variant is outlined', () => {
  const { getByTestId } = rawRender(
    <Button variant="outlined" color="red" testID="button">
      children
    </Button>,
  );
  expect(getByTestId('button-text')).toHaveStyle({
    color: theme.colors.red,
  });
});

it('should be able to add styles to button view', () => {
  const style = { color: 'blue' };
  const { getByTestId } = rawRender(
    <Button testID="button" style={style}>
      children
    </Button>,
  );
  expect(getByTestId('button-view')).toHaveStyle(style);
});

it('should change button text size when pass size prop and it should follow theme fontSize attribute', () => {
  const size = 2;
  const { getByTestId } = rawRender(
    <Button testID="button" size={size}>
      children
    </Button>,
  );
  expect(getByTestId('button-text')).toHaveStyle({
    fontSize: theme.fontSize(size),
  });
});

it('should change font weight when passa weight prop', () => {
  const weight = 'bold';
  const { getByTestId } = rawRender(
    <Button testID="button" weight={weight}>
      children
    </Button>,
  );
  expect(getByTestId('button-text')).toHaveStyle({
    fontWeight: weight,
  });
});

it('should add margin when pass margin prop and follow theme spacing attribute', () => {
  const margin = { bottom: 2 };
  const { getByTestId } = rawRender(
    <Button testID="button" margin={margin}>
      children
    </Button>,
  );
  expect(getByTestId('button')).toHaveStyle({
    marginBottom: theme.spacing(margin.bottom),
  });
});

it('should call onPress correctly when pressed', () => {
  const onPress = jest.fn();
  const { getByTestId } = rawRender(
    <Button testID="button" onPress={onPress}>
      children
    </Button>,
  );
  fireEvent(getByTestId('button'), 'onPress');
  expect(onPress).toHaveBeenCalled();
});

it('should change text color when variant is text', () => {
  const { getByTestId } = rawRender(
    <Button variant="text" color="red" testID="button">
      children
    </Button>,
  );
  expect(getByTestId('button-text')).toHaveStyle({
    color: theme.colors.red,
  });
});

it('should have transparent background when variant is text', () => {
  const { getByTestId } = rawRender(
    <Button variant="text" testID="button">
      children
    </Button>,
  );
  expect(getByTestId('button-view')).toHaveStyle({
    backgroundColor: 'transparent',
  });
});

it('should be able to add icon to button', () => {
  const iconId = 'mock-icon';
  const { getByTestId, debug } = rawRender(
    <Button variant="text" testID="button" icon={<View testID={iconId} />}>
      children
    </Button>,
  );
  debug();
  expect(getByTestId(iconId)).toBeTruthy();
});
