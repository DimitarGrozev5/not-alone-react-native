import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  NativeSyntheticEvent,
  View,
  Text,
  Pressable,
  NativeTouchEvent,
  ScrollView,
} from 'react-native';
import { alpha } from '../../styling/alpha';
import { LightColorsLake } from '../../styling/colors';
import { animateState } from '../../util/animate-state';
import Spacer from '../layout/spacer';
import UiText from '../typography/generic-text';

type Props = {
  selectedValue: string;
  values: string[];
  onChange: (index: string) => void;
};

const valueHeightConst = 48;

const ScrollableSelect: React.FC<Props> = ({
  selectedValue,
  values,
  onChange,
}) => {
  const [lockOutsideChange, setLockOutsideChange] = useState(false);

  const [touchStart, setTouchStart] = useState<null | {
    t: number;
    x: number;
    y: number;
    offset: number;
  }>(null);

  const [scrollOffset, setScrollOffset] = useState(
    -1 * values.indexOf(selectedValue) * valueHeightConst
  );
  useEffect(() => {
    const selectedIndexOffset =
      -1 * values.indexOf(selectedValue) * valueHeightConst;
    // console.log(selectedIndexOffset, scrollOffset);

    if (!lockOutsideChange && selectedIndexOffset !== scrollOffset) {
      setScrollOffset(selectedIndexOffset);
    }
  }, [lockOutsideChange, scrollOffset, selectedValue, values]);

  const touchStartHandler = (e: NativeSyntheticEvent<NativeTouchEvent>) => {
    const t = new Date().getTime();
    const x = e.nativeEvent.pageX;
    const y = e.nativeEvent.pageY;
    setTouchStart({
      t,
      x,
      y,
      offset: scrollOffset,
    });
    setLockOutsideChange(true);
  };

  const touchMoveHandler = (e: NativeSyntheticEvent<NativeTouchEvent>) => {
    const y = e.nativeEvent.pageY;

    if (touchStart) {
      const dy = y - touchStart.y;

      let baseOffset = touchStart.offset;

      const index =
        -1 * Math.round((touchStart.offset + dy) / valueHeightConst);

      if (index < 0) {
        baseOffset = touchStart.offset - values.length * valueHeightConst;
      } else if (index >= values.length) {
        baseOffset = touchStart.offset + values.length * valueHeightConst;
      }

      setScrollOffset(baseOffset + dy);
      setTouchStart((base) => (base ? { ...base, offset: baseOffset } : null));
    }
  };

  const touchEndHandler = (e: NativeSyntheticEvent<NativeTouchEvent>) => {
    const t = new Date().getTime();
    const y = e.nativeEvent.pageY;
    const dt = t - touchStart!.t;
    const dy = y - touchStart!.y;

    const finalSpeed = dy / dt;

    let index = -1 * Math.round(scrollOffset / valueHeightConst);
    let duration = 300;
    let handler: (val: number) => void = setScrollOffset;

    if (touchStart) {
      if (Math.abs(finalSpeed) > 0.8) {
        duration = 500;
        const run = finalSpeed * duration;
        index = -1 * Math.round((scrollOffset + run) / valueHeightConst);

        let loops = 0;
        handler = (val: number) => {
          const targetIndex =
            -1 *
            Math.round(
              (val - loops * values.length * valueHeightConst) /
                valueHeightConst
            );

          if (targetIndex < 0) {
            loops++;
          } else if (targetIndex >= values.length) {
            loops--;
          }
          // console.log(targetIndex, val, loops);

          setScrollOffset(val - loops * values.length * valueHeightConst);
        };
      }

      const targetValue =
        index < 0
          ? values[index + values.length]
          : values[index % values.length];

      animateState(
        scrollOffset,
        -1 * index * valueHeightConst,
        handler,
        () => {
          onChange(targetValue);
          setLockOutsideChange(false);
        },
        duration
      );
      // onChange(values[index]);
    }

    setTouchStart(null);
  };

  const [scrollViewRef, setScrollViewRef] = useState<ScrollView | null>(null);

  return (
  //   <ScrollView
  //     style={styles.scrollViewContainer}
  //     ref={(ref) => setScrollViewRef(ref)}
  //     nestedScrollEnabled={true}
  //     onScroll={(_) => scrollViewRef?.scrollTo(0)}
  //   >
      <Pressable
        style={[styles.container]}
        onTouchStart={touchStartHandler}
        onTouchMove={touchMoveHandler}
        onTouchEnd={touchEndHandler}
      >
        <View style={[styles.mask, styles.alphaMask, { top: 0 }]}></View>
        <View style={[styles.mask, { top: 50 }]}></View>
        <View style={[styles.mask, styles.alphaMask, { top: 100 }]}></View>
        {[...values.slice(-2), ...values, ...values.slice(0, 2)].map((v, i) => (
          <Floater
            key={i}
            currentIndex={i}
            value={v}
            scrollOffset={scrollOffset}
          />
        ))}
      </Pressable>
    //   <UiText>fdfdfd</UiText>
    //   <UiText>fdfdfd</UiText>
    //   <UiText>fdfdfd</UiText>
    //   <UiText>fdfdfd</UiText>
    //   <UiText>fdfdfd</UiText>
    //   <UiText>fdfdfd</UiText>
    //   <UiText>fdfdfd</UiText>
    //   <UiText>fdfdfd</UiText>
    //   <UiText>fdfdfd</UiText>
    //   <UiText>fdfdfd</UiText>
    //   <UiText>fdfdfd</UiText>
    //   <UiText>fdfdfd</UiText>
    //   <UiText>fdfdfd</UiText>
    //   <UiText>fdfdfd</UiText>
    // </ScrollView>
  );
};

type FloaterProps = {
  currentIndex: number;
  value: string;
  scrollOffset: number;
};

const FloaterComponent: React.FC<FloaterProps> = ({
  currentIndex,
  value,
  scrollOffset,
}) => {
  let offset = 58 + (currentIndex - 2) * valueHeightConst + scrollOffset;

  if (offset < -1 * valueHeightConst) {
    return null;
  } else if (offset > 150 + valueHeightConst) {
    return null;
  }

  return (
    <View
      key={currentIndex}
      style={[
        styles.floater,
        {
          top: offset,
          // transform: [
          //   {
          //     translateY:
          //       offset,
          //   },
          // ],
        },
      ]}
    >
      <Text style={styles.floaterText}>{value}</Text>
    </View>
  );
};

const Floater = React.memo(FloaterComponent);

export default ScrollableSelect;

const styles = StyleSheet.create({
  scrollViewContainer: {
    height: 150,
    zIndex: 3,
    backgroundColor: 'red',
  },
  container: {
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // top: 0,
    // bottom: 0,

    borderWidth: 1,
    borderColor: LightColorsLake.A500,
    borderRadius: 4,

    backgroundColor: LightColorsLake.A50,
    height: 150,
    zIndex: 1,
    padding: 0,

    overflow: 'hidden',
  },
  floater: {
    position: 'absolute',
    width: '100%',
    padding: 0,
    zIndex: 1,
    // borderWidth: 1,
  },
  floaterText: {
    textAlign: 'center',
    color: LightColorsLake.A900,
    fontSize: 24,
    padding: 0,
    margin: 0,
  },
  mask: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 50,
    zIndex: 2,
  },
  alphaMask: {
    backgroundColor: alpha(LightColorsLake.A50, 0.8),
  },
});
