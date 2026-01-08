import React from 'react';

/**
 * Convierte texto con markdown básico (**texto**) a elementos React con negritas
 * @param text - Texto que puede contener **texto** para negritas
 * @returns Elementos React con negritas aplicadas
 */
export function formatTextWithBold(text: string): React.ReactNode {
    if (!text) return text;
    
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    const regex = /\*\*(.+?)\*\*/g;
    let match;
    let key = 0;

    while ((match = regex.exec(text)) !== null) {
        // Añadir texto antes del match
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }
        
        // Añadir el texto en negrita
        parts.push(
            <strong key={key++}>
                {match[1]}
            </strong>
        );
        
        lastIndex = regex.lastIndex;
    }

    // Añadir el texto restante
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }

    // Si no hay matches, devolver el texto original
    return parts.length > 0 ? <>{parts}</> : text;
}



