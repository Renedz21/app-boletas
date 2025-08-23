import React, { useState, useCallback, useMemo } from "react";
import { View, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Text } from "@/modules/core/components/ui/text";
import { Button } from "@/modules/core/components/ui/button";
import { Check, Crown, Zap } from "lucide-react-native";

type PlanType = "monthly" | "annual";

interface PricingPlan {
  id: PlanType;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "monthly",
    name: "Plan Mensual",
    price: 25,
    period: "/mes",
    description: "Ideal para probar nuestro servicio",
    features: [
      "Subida ilimitada de boletas",
      "Análisis con IA avanzada",
      "Reportes detallados",
      "Soporte prioritario",
      "Sincronización en la nube",
    ],
  },
  {
    id: "annual",
    name: "Plan Anual",
    price: 249,
    originalPrice: 300,
    discount: "17% OFF",
    period: "/año",
    description: "El mejor valor para usuarios frecuentes",
    features: [
      "Todo del plan mensual",
      "2 meses gratis",
      "Análisis predictivo avanzado",
      "Soporte VIP 24/7",
      "Funciones experimentales",
    ],
    popular: true,
  },
];

const PricingCard = React.memo(
  ({
    plan,
    isSelected,
    onSelect,
  }: {
    plan: PricingPlan;
    isSelected: boolean;
    onSelect: (planId: PlanType) => void;
  }) => (
    <Pressable onPress={() => onSelect(plan.id)} style={{ marginBottom: 16 }}>
      <View
        className={`
        relative rounded-3xl border-2 p-6 
        ${
          isSelected
            ? "border-primary-default bg-primary-default/5"
            : "border-gray-200 bg-white"
        }
        ${plan.popular ? "shadow-xl shadow-primary-default/20" : "shadow-sm"}
      `}
      >
        {/* Popular Badge */}
        {plan.popular && (
          <View className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary-default px-4 py-1">
            <Text size="sm" color="neutral" className="font-bold">
              MÁS POPULAR
            </Text>
          </View>
        )}

        {/* Plan Header */}
        <View className="mb-4 flex-row items-center justify-between">
          <View className="flex-1">
            <Text size="lg" color="secondary" className="font-bold">
              {plan.name}
            </Text>
            <Text size="md" color="secondary" className="mt-1 opacity-70">
              {plan.description}
            </Text>
          </View>

          {isSelected && (
            <View className="ml-4 rounded-full bg-primary-default p-2">
              <Check size={20} color="#FFFFFF" />
            </View>
          )}
        </View>

        {/* Pricing */}
        <View className="mb-4 flex-row items-end">
          <Text size="big" color="primary" className="text-4xl font-bold">
            ${plan.price}
          </Text>
          <Text size="lg" color="secondary" className="mb-1 ml-1 opacity-70">
            {plan.period}
          </Text>

          {plan.discount && (
            <View className="mb-1 ml-3 rounded-full bg-green-100 px-3 py-1">
              <Text
                size="sm"
                color="secondary"
                className="font-bold text-green-700"
              >
                {plan.discount}
              </Text>
            </View>
          )}
        </View>

        {/* Original Price */}
        {plan.originalPrice && (
          <View className="mb-4">
            <Text
              size="md"
              color="secondary"
              className="line-through opacity-50"
            >
              Precio regular: ${plan.originalPrice}
              {plan.period}
            </Text>
          </View>
        )}

        {/* Features */}
        <View className="gap-y-3">
          {plan.features.map((feature, index) => (
            <View key={index} className="flex-row items-center">
              <View className="mr-3 rounded-full bg-green-100 p-1">
                <Check size={14} color="#059669" />
              </View>
              <Text size="md" color="secondary" className="flex-1">
                {feature}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  ),
);

export default function PaymentScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("annual");
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedPlanData = useMemo(
    () => pricingPlans.find((plan) => plan.id === selectedPlan),
    [selectedPlan],
  );

  const handlePlanSelect = useCallback((planId: PlanType) => {
    setSelectedPlan(planId);
  }, []);

  const handlePayment = useCallback(async () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // For MVP, we'll just navigate to the main app
      // In production, integrate with real payment provider
      router.replace("/(tabs)");
    }, 2000);
  }, [router]);

  const buttonTitle = useMemo(() => {
    if (isProcessing) return "Procesando...";
    return `Continuar con ${selectedPlanData?.name}`;
  }, [isProcessing, selectedPlanData?.name]);

  const savings = useMemo(() => {
    if (!selectedPlanData?.originalPrice) return null;
    return selectedPlanData.originalPrice - selectedPlanData.price;
  }, [selectedPlanData]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-6 py-8">
          <View className="mb-6 items-center">
            <View className="mb-4 rounded-full bg-primary-default/10 p-4">
              <Crown size={32} color="#4c68ff" />
            </View>
            <Text
              size="big"
              color="secondary"
              className="text-center font-bold"
            >
              Elige tu plan perfecto
            </Text>
            <Text
              size="lg"
              color="secondary"
              className="mt-2 text-center opacity-80"
            >
              Accede a todas las funciones premium para optimizar tu gestión de
              gastos
            </Text>
          </View>
        </View>

        {/* Pricing Cards */}
        <View className="px-6 pb-8">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isSelected={selectedPlan === plan.id}
              onSelect={handlePlanSelect}
            />
          ))}
        </View>

        {/* Bottom Summary */}
        <View className="mx-6 mb-8 rounded-2xl bg-gray-50 px-6 py-4">
          <View className="mb-2 flex-row items-center">
            <Zap size={20} color="#4c68ff" />
            <Text size="md" color="secondary" className="ml-2 font-bold">
              Resumen del plan seleccionado
            </Text>
          </View>

          {selectedPlanData && (
            <>
              <Text size="lg" color="primary" className="font-bold">
                {selectedPlanData.name} - ${selectedPlanData.price}
                {selectedPlanData.period}
              </Text>
            </>
          )}
        </View>
      </ScrollView>

      {/* CTA Section */}
      <View className="border-t border-gray-100 bg-white px-6 py-4">
        <Button
          title={buttonTitle}
          onPress={handlePayment}
          loading={isProcessing}
          size="lg"
          className="mb-3 w-full"
        />

        <Text size="sm" color="secondary" className="text-center opacity-60">
          Podrás cancelar tu suscripción en cualquier momento desde la
          configuración
        </Text>
      </View>
    </SafeAreaView>
  );
}
