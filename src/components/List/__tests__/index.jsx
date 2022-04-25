import React from 'react';
import { View } from 'react-native';
import { rawRender } from 'test-utils';
import List from '../index';

it('should render components when pass data and renderItem', () => {
  const mockData = [
    { id: '1', name: 'name1' },
    { id: '2', name: 'name2' },
    { id: '3', name: 'name3' },
  ];

  const { getAllByRole, getByTestId } = rawRender(
    <List
      data={mockData}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View testID={item.id} accessibilityRole="header">
          {item.name}
        </View>
      )}
    />,
  );

  expect(getAllByRole('header')).toHaveLength(mockData.length);
  expect(getByTestId(mockData[0].id)).toHaveTextContent(mockData[0].name);
});

it('should render ListEmptyComponent when data is empty', () => {
  const mockData = [];
  const emptyComponentTestId = 'emptyComponentTestId';

  const { queryAllByRole, getByTestId } = rawRender(
    <List
      data={mockData}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View testID={item.id} accessibilityRole="header">
          {item.name}
        </View>
      )}
      ListEmptyComponent={<View testID={emptyComponentTestId} />}
    />,
  );

  expect(queryAllByRole('header')).toHaveLength(0);
  expect(getByTestId(emptyComponentTestId)).toBeTruthy();
});

it('should render null when data is empty and does not have a list empty component', () => {
  const mockData = [];

  const { container } = rawRender(
    <List
      data={mockData}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View testID={item.id} accessibilityRole="header">
          {item.name}
        </View>
      )}
    />,
  );

  expect(container.children).toEqual([]);
});
