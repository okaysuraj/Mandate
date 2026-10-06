import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';
import api from '../../services/api';

const TITLES = { privacy: 'Privacy Policy', terms: 'Terms of Service', legal: 'Legal', security: 'Security' };

function DocumentContent({ slug }) {
  const { colors } = useTheme();
  const [page, setPage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    setPage(null);
    api.get('/public/pages/' + slug, { signal: controller.signal })
      .then(({ data }) => {
        if (controller.signal.aborted) return;
        if (typeof data?.content !== 'string' || !data.content.trim()) throw new Error('Empty document');
        setPage(data);
      })
      .catch(failure => {
        if (controller.signal.aborted) return;
        setError(failure.response?.status === 404
          ? 'This document has not been published yet. Please check back later.'
          : 'Could not load this document. Check your connection and try again.');
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [slug, attempt]);

  if (loading) return (
    <View style={styles.status}>
      <ActivityIndicator color={colors.primary} accessibilityLabel="Loading document" />
      <Text style={[styles.body, { color: colors.onSurfaceVariant }]}>Loading document…</Text>
    </View>
  );
  if (error) return (
    <View style={styles.status}>
      <Text accessibilityRole="alert" style={[styles.body, { color: colors.onSurfaceVariant }]}>{error}</Text>
      <TouchableOpacity accessibilityRole="button" style={styles.retry} onPress={() => setAttempt(value => value + 1)}>
        <Text style={[styles.actionText, { color: colors.primary }]}>Try again</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <ScrollView style={styles.document} contentContainerStyle={styles.documentContent}>
      <Text selectable style={[styles.body, { color: colors.onSurfaceVariant }]}>{page.content}</Text>
    </ScrollView>
  );
}

export default function PublicDocumentModal({ slug, onClose }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={!!slug} transparent animationType="fade" onRequestClose={onClose}>
      <View style={[styles.overlay, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }]}>
        <Pressable accessibilityLabel="Dismiss document" style={StyleSheet.absoluteFill} onPress={onClose} />
        <View accessibilityViewIsModal style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.outlineVariant }]}>
          <View style={[styles.header, { borderBottomColor: colors.outlineVariant }]}>
            <Text accessibilityRole="header" style={[styles.title, { color: colors.onSurface }]}>{TITLES[slug] || 'Document'}</Text>
            <TouchableOpacity accessibilityRole="button" accessibilityLabel="Close document" style={styles.closeIcon} onPress={onClose}>
              <MaterialIcons name="close" size={24} color={colors.onSurfaceVariant} />
            </TouchableOpacity>
          </View>
          {slug && <DocumentContent key={slug} slug={slug} />}
          <TouchableOpacity accessibilityRole="button" style={[styles.closeButton, { backgroundColor: colors.primary }]} onPress={onClose}>
            <Text style={[styles.actionText, { color: colors.onPrimary }]}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  card: { width: '100%', maxWidth: 480, maxHeight: '100%', flexShrink: 1, borderRadius: 16, borderWidth: 1, padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, paddingBottom: 12, marginBottom: 16 },
  title: { flex: 1, fontFamily: 'HankenGrotesk-Bold', fontSize: 20, lineHeight: 26 },
  closeIcon: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  document: { flexShrink: 1, marginBottom: 20 },
  documentContent: { paddingBottom: 8 },
  body: { fontFamily: 'HankenGrotesk-Regular', fontSize: 15, lineHeight: 24 },
  status: { gap: 12, paddingVertical: 16, marginBottom: 12, flexShrink: 1 },
  retry: { minHeight: 44, justifyContent: 'center', alignSelf: 'flex-start' },
  closeButton: { minHeight: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  actionText: { fontFamily: 'HankenGrotesk-SemiBold', fontSize: 16, lineHeight: 22 },
});
