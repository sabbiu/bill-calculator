import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const icons = {
  "fileExport": [MaterialCommunityIcons, 'file-export', 30, '#900'],
  "browse": [MaterialCommunityIcons, 'folder-open', 30, '#900'],
};

let IconsMap = {};
let IconsLoaded = new Promise((resolve, reject) => {
  new Promise.all(
    Object.keys(icons).map(iconName =>
      icons[iconName][0].getImageSource(
        icons[iconName][1],
        icons[iconName][2],
        icons[iconName][3]
      ))
  ).then(sources => {
    Object.keys(icons)
      .forEach((iconName, idx) => IconsMap[iconName] = sources[idx]);
    resolve(true);
  })
});

export {
  IconsMap,
  IconsLoaded
};
