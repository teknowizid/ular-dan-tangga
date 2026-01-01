export interface BoardTheme {
    id: string;
    name: string;
    image: any; // React Native Image source
    source: string; // Identifier for logic/sound variations if needed in future
}

export const BOARD_THEMES: BoardTheme[] = [
    {
        id: 'default',
        name: 'Klasik Jungle',
        image: require('../../assets/board.png'),
        source: 'default'
    },
    {
        id: 'candy',
        name: 'Dunia Permen',
        image: require('../../assets/boards/board-candy.png'),
        source: 'candy'
    },
    {
        id: 'candy2',
        name: 'Dunia Permen 2',
        image: require('../../assets/boards/board-candy2.png'),
        source: 'candy2'
    },
    {
        id: 'edukasi',
        name: 'Edukasi Anak',
        image: require('../../assets/boards/board-edukasi.png'),
        source: 'edukasi'
    },
    {
        id: 'jawa',
        name: 'Tema Jawa',
        image: require('../../assets/boards/board-jawa.png'),
        source: 'jawa'
    }
];

export const getBoardThemeById = (id: string): BoardTheme => {
    return BOARD_THEMES.find(theme => theme.id === id) || BOARD_THEMES[0];
};
