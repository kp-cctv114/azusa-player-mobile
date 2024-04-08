import React from 'react';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ViewEnum } from '@enums/View';
import usePlayback from '@hooks/usePlayback';

export default () => {
  const navigation = useNavigation();
  const { shuffleAll } = usePlayback();
  const onPressed = async () => {
    await shuffleAll();
    navigation.navigate(ViewEnum.PLAYER_HOME as never);
  };

  return <IconButton icon="shuffle" onPress={onPressed} />;
};
