import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Custom hooks
import { useAIAnalysis } from "@/modules/core/hooks/use-ai-analysis";
import { useBoletaSave } from "@/modules/core/hooks/use-boleta-save";

// Components
import { AIAnalysisHeader } from "@/modules/core/components/ai-analysis/ai-analysis-header";
import { ImagePreview } from "@/modules/core/components/ai-analysis/image-preview";
import { AnalysisStatus } from "@/modules/core/components/ai-analysis/analysis-status";
import { CompletedAnalysis } from "@/modules/core/components/ai-analysis/completed-analysis";

interface AIAnalysisScreenProps {
  imagePath: string;
  aiResponse?: string;
  onBack: () => void;
}

export default function AIAnalysisScreen({
  imagePath,
  aiResponse,
  onBack,
}: AIAnalysisScreenProps) {
  // Custom hooks
  const { analysisStatus, extractedData, setStatus, resetAnalysis } =
    useAIAnalysis(aiResponse);
  const { loading, supabaseError, handleSaveToSupabase } = useBoletaSave(
    imagePath,
    onBack,
  );

  const handleSave = async () => {
    if (!extractedData) return;

    setStatus("saving");
    const success = await handleSaveToSupabase(extractedData);

    if (!success) {
      setStatus("completed"); // Return to completed state if save failed
    }
  };

  const handleRetry = () => {
    resetAnalysis();
  };

  const renderContent = () => {
    if (analysisStatus === "completed" && extractedData) {
      return (
        <CompletedAnalysis
          data={extractedData}
          onSave={handleSave}
          loading={loading}
          supabaseError={supabaseError}
        />
      );
    }

    return <AnalysisStatus status={analysisStatus} onRetry={handleRetry} />;
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header */}
        <AIAnalysisHeader onBack={onBack} />

        {/* Image Preview */}
        <ImagePreview imagePath={imagePath} />

        {/* Analysis Content */}
        <View className="px-6 pb-8">{renderContent()}</View>
      </ScrollView>
    </SafeAreaView>
  );
}
