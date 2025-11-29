// app/(tabs)/protection.tsx - INTERACTIVE PROTECTION SCREEN
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  Dimensions, // Import Dimensions for advanced logic if needed, though utilities handle most
} from 'react-native';
import {
  colors,
  Icon,
  moderateScale,
  normalize,
  phishingPatterns,
  phishingStats,
  shadows,
  spacing,
  verticalScale,
  verticalSpacing
} from '../components/shared';

// Get screen width for potential future use or better understanding
const { width } = Dimensions.get('window');
const isSmallScreen = width < 375; // Example threshold for small phones

export default function ProtectionScreen() {
  const [aiMonitoring, setAiMonitoring] = useState(true);
  const [zeroTrustEngine, setZeroTrustEngine] = useState(true);
  const [networkAnalysis, setNetworkAnalysis] = useState(true);

  const handleToggle = async (setter: React.Dispatch<React.SetStateAction<boolean>>, current: boolean, name: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setter(!current);
    Alert.alert(
      name,
      `${name} has been ${!current ? 'enabled' : 'disabled'}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <LinearGradient colors={['#0F172A', '#1E293B', '#0F172A']} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.headerLeft}
            onPress={async () => {
              await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              Alert.alert('ZeroTrust IoT', 'Advanced Protection System');
            }}
            activeOpacity={0.7}
          >
            <View style={styles.headerIconWrapper}>
              <LinearGradient colors={['#EF4444', '#EC4899']} style={styles.headerIcon}>
                <Icon name="shield" size={moderateScale(28)} color="#FFF" />
              </LinearGradient>
              <View style={styles.headerBadge} />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>ZeroTrust IoT</Text>
              <Text style={styles.headerSubtitle}>AI Security Platform</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerRight}
            onPress={async () => {
              await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              Alert.alert('Protected Status', 'All security layers active');
            }}
            activeOpacity={0.7}
          >
            <View style={styles.headerStatus}>
              <View style={styles.headerStatusDot} />
              <Text style={styles.headerStatusText}>PROTECTED</Text>
            </View>
            <Text style={styles.headerTime}>{new Date().toLocaleTimeString()}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Protection Status */}
        <TouchableOpacity
          onPress={async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            Alert.alert(
              'Protection Status',
              `All systems operational\n\nThreats Blocked: ${phishingStats.threatsBlocked}\nEmails Scanned: ${phishingStats.emailsScanned}\nURLs Checked: ${phishingStats.urlsChecked}\nSuccess Rate: ${phishingStats.successRate}%`
            );
          }}
          activeOpacity={0.9}
        >
          <LinearGradient colors={['#059669', '#0D9488', '#06B6D4']} style={styles.protectionHeader}>
            <View style={styles.protectionHeaderContent}>
              <View style={styles.protectionTextContainer}>
                <Text style={styles.protectionTitle}>Protection Status</Text>
                <Text style={styles.protectionSubtitle}>Advanced AI security active</Text>
              </View>
              <View style={styles.protectionIcon}>
                <Icon name="shield" size={moderateScale(36)} color="#FFF" />
              </View>
            </View>
            <View style={styles.protectionStats}>
              <View style={styles.protectionStatsColumn}>
                <TouchableOpacity 
                  style={styles.protectionStatCard}
                  onPress={async () => {
                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    Alert.alert('Threats Blocked', `${phishingStats.threatsBlocked} threats neutralized today`);
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.protectionStatValue}>{phishingStats.threatsBlocked}</Text>
                  <Text style={styles.protectionStatLabel}>Threats Blocked Today</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.protectionStatCard}
                  onPress={async () => {
                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    Alert.alert('Emails Scanned', `${phishingStats.emailsScanned} emails analyzed for threats`);
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.protectionStatValue}>{phishingStats.emailsScanned}</Text>
                  <Text style={styles.protectionStatLabel}>Emails Analyzed</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.protectionStatsColumn}>
                <TouchableOpacity 
                  style={styles.protectionStatCard}
                  onPress={async () => {
                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    Alert.alert('URLs Checked', `${phishingStats.urlsChecked} URLs verified for security`);
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.protectionStatValue}>{phishingStats.urlsChecked}</Text>
                  <Text style={styles.protectionStatLabel}>URLs Verified</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.protectionStatCard}
                  onPress={async () => {
                    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    Alert.alert('Detection Rate', `${phishingStats.successRate}% accurate threat detection`);
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.protectionStatValue}>{phishingStats.successRate}%</Text>
                  <Text style={styles.protectionStatLabel}>Detection Rate</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Real-time Status */}
        <View style={styles.card}>
          <TouchableOpacity 
            style={styles.cardHeader}
            onPress={async () => {
              await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              Alert.alert('Real-time Protection', 'All protection layers are active and monitoring');
            }}
            activeOpacity={0.8}
          >
            <Icon name="activity" size={moderateScale(22)} color={colors.primary.main} />
            <Text style={styles.cardTitle}>Real-time Protection</Text>
          </TouchableOpacity>
          <View style={styles.protectionList}>
            {/* AI Monitoring */}
            <ProtectionItem
              title="AI Monitoring"
              subtitle="Continuous threat analysis"
              iconName="eye"
              colors={['#10B981', '#059669']}
              itemColors={['#ECFDF5', '#D1FAE5']}
              value={aiMonitoring}
              onToggle={() => handleToggle(setAiMonitoring, aiMonitoring, 'AI Monitoring')}
              trackColor={colors.success.light}
              thumbColor={colors.success.main}
            />

            {/* Zero Trust Engine */}
            <ProtectionItem
              title="Zero Trust Engine"
              subtitle="Never trust, always verify"
              iconName="lock"
              colors={['#3B82F6', '#2563EB']}
              itemColors={['#EFF6FF', '#DBEAFE']}
              value={zeroTrustEngine}
              onToggle={() => handleToggle(setZeroTrustEngine, zeroTrustEngine, 'Zero Trust Engine')}
              trackColor={colors.primary.light}
              thumbColor={colors.primary.main}
            />

            {/* Network Analysis */}
            <ProtectionItem
              title="Network Analysis"
              subtitle="Deep packet inspection"
              iconName="wifi"
              colors={['#A855F7', '#9333EA']}
              itemColors={['#FAF5FF', '#F3E8FF']}
              value={networkAnalysis}
              onToggle={() => handleToggle(setNetworkAnalysis, networkAnalysis, 'Network Analysis')}
              trackColor={'#DDD6FE'}
              thumbColor={'#A855F7'}
            />
          </View>
        </View>

        {/* Threat Intelligence */}
        <TouchableOpacity 
          style={styles.threatIntelCard}
          onPress={async () => {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            Alert.alert('Threat Intelligence', 'Real-time threat patterns detected globally');
          }}
          activeOpacity={0.9}
        >
          <View style={styles.threatIntelHeader}>
            <Icon name="alert" size={moderateScale(22)} color="#F87171" />
            <Text style={styles.threatIntelTitle}>Threat Intelligence</Text>
          </View>
          {phishingPatterns.slice(0, 4).map((pattern, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.threatPattern}
              onPress={async () => {
                await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                Alert.alert('Threat Pattern', `"${pattern}"\n\nThis phrase is commonly used in phishing attacks`);
              }}
              activeOpacity={0.7}
            >
              <View style={styles.threatPatternIcon}>
                <Icon name="alert" size={moderateScale(14)} color="#F87171" />
              </View>
              <Text style={styles.threatPatternText} numberOfLines={1}>"{pattern}"</Text>
              <View style={styles.threatPatternBadge}>
                <Text style={styles.threatPatternBadgeText}>HIGH RISK</Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity 
            style={styles.threatNetwork}
            onPress={async () => {
              await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              Alert.alert(
                'Global Threat Network',
                'Connected to 50,000+ security nodes worldwide sharing real-time intelligence'
              );
            }}
            activeOpacity={0.8}
          >
            <View style={styles.threatNetworkHeader}>
              <Icon name="users" size={moderateScale(18)} color="#FB923C" />
              <Text style={styles.threatNetworkTitle}>Global Threat Network</Text>
            </View>
            <Text style={styles.threatNetworkText}>
              Connected to 50,000+ security nodes worldwide for real-time threat intelligence sharing.
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Security Tips */}
        <View style={styles.card}>
          <TouchableOpacity 
            style={styles.cardHeader}
            onPress={async () => {
              await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              Alert.alert('Security Tips', 'Best practices to stay protected online');
            }}
            activeOpacity={0.8}
          >
            <Icon name="zap" size={moderateScale(22)} color={colors.warning.main} />
            <Text style={styles.cardTitle}>Security Tips</Text>
          </TouchableOpacity>
          <View style={styles.tipsList}>
            {/* Tip 1 */}
            <TipItem
              title="Verify Before Clicking"
              text="Always hover over links to preview the destination URL before clicking."
              iconName="check"
              iconBgColor={colors.success.main}
              itemColors={['#ECFDF5', '#D1FAE5']}
              alertBody="Always hover over links to preview the destination URL before clicking. Look for suspicious domains or misspellings."
            />

            {/* Tip 2 */}
            <TipItem
              title="Check for HTTPS"
              text="Legitimate sites use secure connections. Look for the lock icon in your browser."
              iconName="lock"
              iconBgColor={colors.primary.main}
              itemColors={['#EFF6FF', '#DBEAFE']}
              alertBody="Legitimate sites use secure connections. Look for the lock icon in your browser address bar."
            />

            {/* Tip 3 */}
            <TipItem
              title="Suspicious Email Signs"
              text="Watch for urgent language, spelling errors, and requests for personal information."
              iconName="mail"
              iconBgColor={'#A855F7'}
              itemColors={['#FAF5FF', '#F3E8FF']}
              alertBody="Watch for urgent language, spelling errors, generic greetings, and requests for personal information."
            />
          </View>
        </View>

        <View style={{ height: verticalScale(20) }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Reusable Components for Cleaner Code and Potential Responsiveness Logic ---

interface ProtectionItemProps {
  title: string;
  subtitle: string;
  iconName: string;
  colors: string[];
  itemColors: string[];
  value: boolean;
  onToggle: () => void;
  trackColor: string;
  thumbColor: string;
}

const ProtectionItem: React.FC<ProtectionItemProps> = ({
  title,
  subtitle,
  iconName,
  colors,
  itemColors,
  value,
  onToggle,
  trackColor,
  thumbColor,
}) => (
  <TouchableOpacity
    onPress={async () => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      Alert.alert(title, subtitle);
    }}
    activeOpacity={0.8}
  >
    <LinearGradient colors={itemColors} style={styles.protectionItem}>
      <View style={styles.protectionItemLeft}>
        <LinearGradient colors={colors} style={styles.protectionItemIcon}>
          <Icon name={iconName} size={moderateScale(22)} color="#FFF" />
        </LinearGradient>
        <View style={styles.protectionItemTextContainer}>
          <Text style={styles.protectionItemTitle}>{title}</Text>
          <Text style={styles.protectionItemSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <View style={styles.protectionItemRight}>
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: colors.neutral.gray300, true: trackColor }}
          thumbColor={value ? thumbColor : colors.neutral.gray400}
        />
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

interface TipItemProps {
  title: string;
  text: string;
  iconName: string;
  iconBgColor: string;
  itemColors: string[];
  alertBody: string;
}

const TipItem: React.FC<TipItemProps> = ({
  title,
  text,
  iconName,
  iconBgColor,
  itemColors,
  alertBody,
}) => (
  <TouchableOpacity
    onPress={async () => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      Alert.alert(title, alertBody);
    }}
    activeOpacity={0.8}
  >
    <LinearGradient colors={itemColors} style={styles.tipItem}>
      <View style={[styles.tipIcon, { backgroundColor: iconBgColor }]}>
        <Icon name={iconName} size={moderateScale(18)} color="#FFF" />
      </View>
      <View style={styles.tipContent}>
        <Text style={styles.tipTitle}>{title}</Text>
        <Text style={styles.tipText} numberOfLines={2}>{text}</Text>
      </View>
    </LinearGradient>
  </TouchableOpacity>
);


// --- Stylesheet ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.gray100,
  },
  header: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + verticalScale(5) : verticalScale(10),
    paddingBottom: verticalScale(15),
    paddingHorizontal: spacing.lg,
    ...shadows.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // Ensures content wraps if necessary on extremely narrow screens, though unlikely here
    // flexWrap: 'wrap', 
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    // Allows left side to shrink/grow slightly
    flexShrink: 1, 
    marginRight: spacing.md,
  },
  headerIconWrapper: {
    position: 'relative',
  },
  headerIcon: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: moderateScale(14),
    height: moderateScale(14),
    borderRadius: moderateScale(7),
    backgroundColor: colors.success.main,
    borderWidth: 2,
    borderColor: '#0F172A',
  },
  headerText: {
    marginLeft: spacing.md,
    // Ensures text can take space and titles/subtitles don't get cut off immediately
    flexShrink: 1, 
  },
  headerTitle: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    color: colors.neutral.white,
  },
  headerSubtitle: {
    fontSize: normalize(12),
    color: colors.neutral.gray300,
  },
  headerRight: {
    alignItems: 'flex-end',
    // Ensures the time/status is not squeezed by the left content
    flexShrink: 0,
  },
  headerStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  headerStatusDot: {
    width: moderateScale(7),
    height: moderateScale(7),
    borderRadius: moderateScale(3.5),
    backgroundColor: colors.success.main,
    marginRight: spacing.xs,
  },
  headerStatusText: {
    fontSize: normalize(10),
    fontWeight: '600',
    color: '#6EE7B7',
  },
  headerTime: {
    fontSize: normalize(9),
    color: colors.neutral.gray400,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    // Use paddingHorizontal for horizontal spacing and let flex: 1 handle vertical
  },
  scrollContent: {
    paddingTop: spacing.lg,
    paddingBottom: Platform.OS === 'ios' ? verticalScale(120) : verticalScale(100),
  },
  protectionHeader: {
    borderRadius: moderateScale(20),
    padding: spacing.lg,
    marginBottom: verticalSpacing.lg,
    ...shadows.lg,
  },
  protectionHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: verticalSpacing.lg,
  },
  protectionTextContainer: {
    flex: 1, // Allows text container to take up remaining space
    marginRight: spacing.md,
  },
  protectionTitle: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    color: colors.neutral.white,
    marginBottom: 6,
  },
  protectionSubtitle: {
    fontSize: normalize(12),
    color: 'rgba(167,243,208,0.9)',
    lineHeight: normalize(16),
  },
  protectionIcon: {
    width: moderateScale(56),
    height: moderateScale(56),
    borderRadius: moderateScale(16),
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0, // Ensure the icon doesn't shrink
  },
  protectionStats: {
    flexDirection: 'row',
    gap: spacing.md,
    // Ensures stats columns remain side-by-side but allows for flexible sizing
    flexWrap: 'wrap', 
  },
  protectionStatsColumn: {
    flex: 1, // Allows columns to take equal space
    minWidth: moderateScale(140), // Optional: ensure minimum width on small screens before layout breaks
    gap: verticalScale(10),
  },
  protectionStatCard: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: moderateScale(14),
    padding: spacing.md,
    alignItems: 'center',
    minHeight: verticalScale(70),
    justifyContent: 'center',
    flex: 1, // Ensures stat cards fill their column space vertically
  },
  protectionStatValue: {
    fontSize: normalize(22),
    fontWeight: 'bold',
    color: colors.neutral.white,
    marginBottom: 4,
  },
  protectionStatLabel: {
    fontSize: normalize(10),
    color: 'rgba(167,243,208,0.9)',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: moderateScale(20),
    padding: spacing.lg,
    marginBottom: verticalSpacing.lg,
    ...shadows.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalSpacing.lg,
  },
  cardTitle: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    color: colors.neutral.gray900,
    marginLeft: spacing.md,
  },
  protectionList: {
    gap: verticalScale(10),
  },
  protectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: moderateScale(14),
    borderWidth: 2,
    borderColor: 'transparent',
    padding: spacing.md,
  },
  protectionItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Allows the text/icon area to take available space
  },
  protectionItemIcon: {
    width: moderateScale(42),
    height: moderateScale(42),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    flexShrink: 0,
  },
  protectionItemTextContainer: {
    flex: 1, // Crucial: allows text to wrap if necessary
  },
  protectionItemTitle: {
    fontSize: normalize(14),
    fontWeight: '600',
    color: colors.neutral.gray900,
    marginBottom: 2,
  },
  protectionItemSubtitle: {
    fontSize: normalize(11),
    color: colors.neutral.gray500,
  },
  protectionItemRight: {
    marginLeft: spacing.md,
    flexShrink: 0,
  },
  threatIntelCard: {
    backgroundColor: colors.neutral.gray800,
    borderRadius: moderateScale(20),
    padding: spacing.lg,
    marginBottom: verticalSpacing.lg,
  },
  threatIntelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalSpacing.md,
  },
  threatIntelTitle: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    color: colors.neutral.white,
    marginLeft: spacing.md,
  },
  threatPattern: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: moderateScale(14),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    padding: spacing.md,
    marginBottom: verticalScale(8),
  },
  threatPatternIcon: {
    width: moderateScale(28),
    height: moderateScale(28),
    borderRadius: moderateScale(8),
    backgroundColor: 'rgba(239,68,68,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    flexShrink: 0,
  },
  threatPatternText: {
    flex: 1,
    fontSize: normalize(12),
    color: colors.neutral.gray200,
    lineHeight: normalize(16),
  },
  threatPatternBadge: {
    backgroundColor: 'rgba(239,68,68,0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(6),
    flexShrink: 0,
    marginLeft: spacing.sm,
  },
  threatNetwork: {
    backgroundColor: 'rgba(251,146,60,0.1)',
    borderRadius: moderateScale(14),
    borderWidth: 1,
    borderColor: 'rgba(251,146,60,0.2)',
    padding: spacing.md,
    marginTop: verticalSpacing.md,
  },
  threatNetworkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  threatNetworkTitle: {
    fontSize: normalize(13),
    fontWeight: '600',
    color: '#FB923C',
    marginLeft: spacing.sm,
  },
  threatNetworkText: {
    fontSize: normalize(12),
    color: colors.neutral.gray300,
    lineHeight: normalize(17),
  },
  tipsList: {
    gap: verticalScale(10),
  },
  tipItem: {
    flexDirection: 'row',
    borderRadius: moderateScale(14),
    padding: spacing.md,
  },
  tipIcon: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(10),
    backgroundColor: colors.success.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    flexShrink: 0,
  },
  tipContent: {
    flex: 1, // Crucial: allows text to wrap if necessary
  },
  tipTitle: {
    fontSize: normalize(14),
    fontWeight: '600',
    color: colors.neutral.gray900,
    marginBottom: 4,
  },
  tipText: {
    fontSize: normalize(12),
    color: colors.neutral.gray500,
    lineHeight: normalize(17),
  },
});
