import React, { useEffect } from 'react';
import { Searchbar, Text, TextInput } from 'react-native-paper';
import { View, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNoxSetting } from '@hooks/useSetting';
import { seconds2HHMMSS } from '@utils/Utils';

interface Props {
  searchText: string;
  setSearchText: (val: string) => void;
  search?: boolean;
  onPressed?: () => void;
}

export default ({
  searchText,
  setSearchText,
  search = false,
  onPressed = () => undefined,
}: Props) => {
  const { t } = useTranslation();
  const currentPlaylist = useNoxSetting(state => state.currentPlaylist);
  const playerStyle = useNoxSetting(state => state.playerStyle);

  useEffect(() => {
    setSearchText('');
  }, [currentPlaylist]);

  return (
    <View style={styles.container}>
      {search ? (
        <Searchbar
          placeholder={String(t('PlaylistSearchBar.label'))}
          value={searchText}
          onChangeText={(val: string) => {
            setSearchText(val);
          }}
          style={styles.textInput}
          inputStyle={styles.searchInput}
          autoFocus
          selectTextOnFocus
          selectionColor={playerStyle.customColors.textInputSelectionColor}
        />
      ) : (
        <Pressable onPress={onPressed} style={styles.pressable}>
          <Text variant="titleMedium">{currentPlaylist.title}</Text>
          <Text variant="labelMedium">{`${
            currentPlaylist.songList.length
          } / ${seconds2HHMMSS(
            currentPlaylist.songList.reduce(
              (accumulator, currentValue) =>
                accumulator + currentValue.duration,
              0
            )
          )}`}</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 15,
    paddingLeft: 10,
  },
  textInput: {
    height: 40,
  },
  searchInput: {
    marginTop: -8,
  },
  pressable: {
    // Add any additional styles for the Pressable component here
  },
});
