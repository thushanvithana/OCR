import React, { useRef, useEffect, useState } from 'react';
import { Modal, View, Text, Button, Animated, Pressable } from 'react-native';
import { SegmentedArc } from '@shipt/segmented-arc-for-react-native';

const ResultModal = ({ visible, predValue, onClose }) => {
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const [showArcRanges, setShowArcRanges] = useState(false);

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const translateY = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  const handleNext = () => {
    console.log("Next button clicked");
  };

  const handleTips = () => {
    console.log("Tips button clicked");
  };

  const segments = [
    {
      scale: 0.25,
      filledColor: '#6E73FF',
      emptyColor: '#F2F3F5',
      data: { label: 'Blue' }
    },
    {
      scale: 0.25,
      filledColor: '#78F5CA',
      emptyColor: '#F2F3F5',
      data: { label: 'Green' }
    },
    {
      scale: 0.25,
      filledColor: '#F5E478',
      emptyColor: '#F2F3F5',
      data: { label: 'Yellow' }
    },
    {
      scale: 0.25,
      filledColor: '#FF746E',
      emptyColor: '#F2F3F5',
      data: { label: 'Red' }
    }
  ];

  const ranges = ['10', '20', '30', '40', '50'];

  const _handlePress = () => {
    setShowArcRanges(!showArcRanges);
  };

  const fillValue = predValue && predValue.toLowerCase() === "diabetes positive" ? 570 : 20;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <Animated.View style={{ transform: [{ translateY }], backgroundColor: 'white', padding: 20, borderRadius: 25, width: '80%', maxHeight: '80%', alignSelf: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Prediction Result</Text>
          <SegmentedArc
            segments={segments}
            fillValue={fillValue}
            isAnimated={true}
            animationDelay={1000}
            showArcRanges={showArcRanges}
            ranges={ranges}
          >
            {metaData => (
              <Pressable onPress={_handlePress} style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 16, paddingTop: 16 }}>{predValue}</Text>
              </Pressable>
            )}
          </SegmentedArc>
          {predValue && predValue.toLowerCase() === "positive" ? (
            <>
              <Text style={{ fontSize: 16, paddingTop: 16 }}></Text>
              <Text style={{ fontSize: 16, paddingTop: 16 }}>You have diabetes. Next, check your eyes for blindness.</Text>
              <Text style={{ fontSize: 16, paddingTop: 16 }}></Text>
              <Text style={{ fontSize: 16, paddingTop: 16 }}>{predValue}</Text>
              <Button title="See Near Clinics" onPress={handleNext} />
            </>
          ) : (
            <>
           
              <Text style={{ fontSize: 16, paddingTop: 16 }}></Text>
              <Text style={{ fontSize: 16, paddingTop: 16 }}>Well done! for not having diabetes. See more health tips to become even healthier</Text>
              <Text style={{ fontSize: 16, paddingTop: 16 }}></Text>
              <Text style={{ fontSize: 16, paddingTop: 16 }}>{predValue}</Text>
              <Button title="Tips" onPress={handleTips} />
            </>
          )}
          <Button title="Close" onPress={onClose} />
        </Animated.View>
      </View>
    </Modal>
  );
};

export default ResultModal;
