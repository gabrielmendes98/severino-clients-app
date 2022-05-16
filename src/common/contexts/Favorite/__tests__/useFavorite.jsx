import React from 'react';
import { View, Text } from 'react-native';
import * as util from 'common/util/throwError';
import { rawRender, waitFor } from 'test-utils';
import { useFavorite } from '../index';

it('should throw error when component is not wrapped in context', async () => {
  const spy = jest.spyOn(util, 'throwError');
  const Component = () => {
    const favorite = useFavorite();
    return (
      <View>
        <Text>{String(favorite)}</Text>
      </View>
    );
  };
  rawRender(<Component />);

  await waitFor(() => {
    expect(spy).toHaveBeenCalledWith(
      'Verifique se seu componente está envolvido em um FavoriteProvider',
    );
  });
});
