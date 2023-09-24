import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation, ParamListBase } from '@react-navigation/native';

import { ICONS } from '@enums/Icons';
import RandomGIFButton from '../buttons/RandomGIF';
import { useNoxSetting } from '@hooks/useSetting';
import { ViewEnum } from '@enums/View';

export default () => {
  const playerStyle = useNoxSetting(state => state.playerStyle);
  const currentPlayingId = useNoxSetting(state => state.currentPlayingId);
  const iconSize = 80;
  const navigationGlobal = useNavigation();

  return (
    <View style={styles.sidebar}>
      <View style={styles.randomGifButtonContainerStyle}>
        <RandomGIFButton
          gifs={playerStyle.gifs}
          favList={String(currentPlayingId)}
          iconsize={iconSize}
        />
      </View>
      <IconButton
        icon={ICONS.homeScreen}
        size={iconSize}
        onPress={() => navigationGlobal.navigate(ViewEnum.LYRICS as never)}
      />
      <IconButton
        icon={ICONS.playlistScreen}
        size={iconSize}
        onPress={() =>
          navigationGlobal.navigate(ViewEnum.PLAYER_PLAYLIST as never)
        }
      />
      <IconButton
        icon={ICONS.exploreScreen}
        size={iconSize}
        onPress={() => navigationGlobal.navigate(ViewEnum.EXPORE as never)}
      />
      <IconButton
        icon={ICONS.settingScreen}
        size={iconSize}
        onPress={() => navigationGlobal.navigate(ViewEnum.SETTINGS as never)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 100,
    flexDirection: 'column',
    backgroundColor: 'lightgrey',
  },
  randomGifButtonContainerStyle: {
    paddingTop: 20,
    alignContent: 'center',
    alignItems: 'center',
  },
});
