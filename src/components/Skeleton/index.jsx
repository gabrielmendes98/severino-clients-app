/* eslint-disable react-native/no-inline-styles */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import SkeletonContent from 'react-native-skeleton-content';
import theme from 'common/styles/theme';
import { generateItemsStyleWithProps } from './util';

const Skeleton = ({
  children,
  ready,
  length,
  width,
  height,
  direction,
  spacing,
  containerStyle,
  itemsStyle,
}) => (
  <SkeletonContent
    containerStyle={{
      flex: 1,
      flexDirection: direction,
      ...containerStyle,
    }}
    isLoading={!ready}
    layout={Array.from(Array(length)).map((_, index) => ({
      key: index,
      ...generateItemsStyleWithProps({
        width,
        height,
        direction,
        spacing,
      }),
      ...itemsStyle,
    }))}
    boneColor={theme.colors.lightGrey}
    highlightColor={theme.colors.background.main}
  >
    {children}
  </SkeletonContent>
);

Skeleton.defaultProps = {
  length: 1,
  width: 10,
  height: 10,
  direction: 'row',
  spacing: 1.5,
  wrap: false,
};

Skeleton.propTypes = {
  children: PropTypes.any,
  ready: PropTypes.bool,
  length: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  direction: PropTypes.oneOf(['row', 'column']),
  spacing: PropTypes.number,
  containerStyle: PropTypes.object,
  itemsStyle: PropTypes.object,
};

export default memo(
  Skeleton,
  /* istanbul ignore next */
  (prevProps, nextProps) => prevProps.ready === nextProps.ready,
);
