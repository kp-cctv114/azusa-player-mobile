import * as React from 'react';
import { Text, Avatar, Button, ActivityIndicator } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import {
  getBiliFavlist,
  GETFAVLIST_RES,
} from '../../utils/Bilibili/bilifavOperate';
import GenericCheckDialog from '../dialogs/GenericCheckDialog';
import bilifavlistFetch from '../../utils/mediafetch/bilifavlist';
import { dummyPlaylist } from '../../objects/Playlist';

export default () => {
  const { t } = useTranslation();
  const [visible, setVisible] = React.useState(false);
  const [favLists, setFavLists] = React.useState<GETFAVLIST_RES[]>([]);
  const [loading, setLoading] = React.useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const onClick = async () => {
    setFavLists(await getBiliFavlist());
    showDialog();
  };

  const onSubmit = async (indices: boolean[]) => {
    setLoading(true);
    for (const [i, v] of indices.entries()) {
      if (v) {
        const favlist = dummyPlaylist(favLists[i].title);
        favlist.songList = await bilifavlistFetch.regexFetch({
          reExtracted: [
            0,
            String(favLists[i].id),
            // HACK: only reExtracted[1] is used so hopefully fine...
          ] as unknown as RegExpExecArray,
          favList: [],
          useBiliTag: false,
        });
      }
    }
    hideDialog();
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator size={100} />
      ) : (
        <Button onPress={onClick}>{t('Login.SyncBiliFavlist')}</Button>
      )}
      <GenericCheckDialog
        visible={visible}
        title="Check Dialog"
        options={favLists}
        onSubmit={onSubmit}
      />
    </>
  );
};
