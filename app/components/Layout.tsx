import React from 'react';
import { View, StyleSheet } from 'react-native';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16, // پدینگ افقی
        paddingTop:24,
        backgroundColor:'#fff'
    },
});

export default Layout;
