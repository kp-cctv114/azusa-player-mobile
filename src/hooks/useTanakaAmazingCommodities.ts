import { useEffect, useState } from 'react';
import RNFetchBlob from 'react-native-blob-util';

import { getItem, saveItem } from '@utils/ChromeStorageAPI';
import { fetchVideoPlayUrl } from '../utils/mediafetch/bilivideo';
import { customReqHeader } from '@utils/BiliFetch';
import { StorageKeys } from '@enums/Storage';
import { getFileSize } from '../utils/RNUtils';

const TanakaSrc = 'BV1cK42187AE'; //'https://www.bilibili.com/video/BV1cK42187AE/';

const getTanaka = () => getItem(StorageKeys.TANAKA_AMAZING_COMMODITIES);
export const getTakanaDesc = async () => {
  const tanakaPath = await getTanaka();
  return `${tanakaPath}\n${(await getFileSize(tanakaPath)).size / 1000} KiB`;
};
export const deleteTanaka = () => getTanaka().then(RNFetchBlob.fs.unlink);

export default () => {
  const [tanaka, setTanaka] = useState<string | undefined>();
  const [initialized, setInitialized] = useState(false);

  const init = async () => {
    const tanakaPath = (await getItem(
      StorageKeys.TANAKA_AMAZING_COMMODITIES
    )) as string | null;
    if (tanakaPath && (await RNFetchBlob.fs.exists(tanakaPath))) {
      setTanaka(tanakaPath);
      setInitialized(true);
      return;
    }
    setInitialized(true);
    const resolvedURL = await fetchVideoPlayUrl(TanakaSrc, true);
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', resolvedURL, customReqHeader(resolvedURL))
      .then(res =>
        saveItem(StorageKeys.TANAKA_AMAZING_COMMODITIES, res.path())
      );
  };

  useEffect(() => {
    init();
  }, []);

  return { tanaka, initialized };
};
