import React from 'react'
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native'
import { BOARD_THEMES } from '../config/boardThemes'

interface BoardPickerProps {
    selectedBoard: string
    onSelect: (boardId: string) => void
}

export default function BoardPicker({ selectedBoard, onSelect }: BoardPickerProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>PILIH PAPAN PERMAINAN</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {BOARD_THEMES.map((theme) => (
                    <Pressable
                        key={theme.id}
                        style={[
                            styles.card,
                            selectedBoard === theme.id && styles.cardSelected
                        ]}
                        onPress={() => onSelect(theme.id)}
                    >
                        <Image source={theme.image} style={styles.previewImage} resizeMode="cover" />
                        <Text
                            style={[
                                styles.themeName,
                                selectedBoard === theme.id && styles.themeNameSelected
                            ]}
                            numberOfLines={1}
                        >
                            {theme.name}
                        </Text>
                        {selectedBoard === theme.id && (
                            <View style={styles.checkBadge}>
                                <Text style={styles.checkText}>✓</Text>
                            </View>
                        )}
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    label: {
        fontSize: 12,
        fontWeight: '700',
        color: '#374151',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 8,
    },
    scrollContent: {
        paddingRight: 12,
        gap: 12,
    },
    card: {
        width: 100,
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    cardSelected: {
        borderColor: '#15803D',
        backgroundColor: '#F0FDF4',
    },
    previewImage: {
        width: '100%',
        height: 100,
        backgroundColor: '#ddd',
    },
    themeName: {
        fontSize: 11,
        fontWeight: '600',
        color: '#4B5563',
        padding: 6,
        textAlign: 'center',
    },
    themeNameSelected: {
        color: '#15803D',
        fontWeight: 'bold',
    },
    checkBadge: {
        position: 'absolute',
        top: 6,
        right: 6,
        backgroundColor: '#15803D',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
})
