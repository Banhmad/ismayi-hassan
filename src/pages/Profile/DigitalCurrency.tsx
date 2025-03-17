import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Coins,
  Award,
  Clock,
  TrendingUp,
  Download,
  FileText,
} from "lucide-react";

const DigitalCurrency = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("mining");
  const [isMining, setIsMining] = useState(false);
  const [miningRate, setMiningRate] = useState(0.05); // عملات لكل دقيقة
  const [miningProgress, setMiningProgress] = useState(0);
  const [miningTime, setMiningTime] = useState(0);
  const [totalMined, setTotalMined] = useState(0);

  // محاكاة عملية التعدين
  useEffect(() => {
    let miningInterval: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    if (isMining) {
      // تحديث التقدم كل 100 مللي ثانية
      progressInterval = setInterval(() => {
        setMiningProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 1;
        });
      }, 600);

      // إضافة عملات كل دقيقة
      miningInterval = setInterval(() => {
        setTotalMined((prev) => prev + miningRate);
        setMiningTime((prev) => prev + 1);
      }, 60000);
    }

    return () => {
      clearInterval(miningInterval);
      clearInterval(progressInterval);
    };
  }, [isMining, miningRate]);

  // بدء أو إيقاف التعدين
  const toggleMining = () => {
    setIsMining(!isMining);
    if (!isMining) {
      setMiningProgress(0);
    }
  };

  // تاريخ المعاملات الوهمي
  const transactions = [
    {
      id: "tx1",
      type: "mining",
      amount: 2.5,
      date: "2023-06-15",
      status: "completed",
    },
    {
      id: "tx2",
      type: "reward",
      amount: 10,
      date: "2023-06-10",
      status: "completed",
    },
    {
      id: "tx3",
      type: "service",
      amount: 5,
      date: "2023-06-05",
      status: "completed",
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Coins className="mr-2 h-6 w-6 text-primary" />
            {t("digitalCurrency") || "العملة الرقمية"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="mining">
                <TrendingUp className="h-4 w-4 mr-2" />
                التعدين
              </TabsTrigger>
              <TabsTrigger value="wallet">
                <Coins className="h-4 w-4 mr-2" />
                المحفظة
              </TabsTrigger>
              <TabsTrigger value="whitepaper">
                <FileText className="h-4 w-4 mr-2" />
                الورقة البيضاء
              </TabsTrigger>
            </TabsList>

            {/* قسم التعدين */}
            <TabsContent value="mining" className="space-y-6 mt-6">
              <div className="bg-primary/10 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-bold">تعدين العملة الرقمية</h3>
                    <p className="text-sm text-muted-foreground">
                      قم بتعدين عملات ServiceCoin مقابل وقت تصفحك للموقع
                    </p>
                  </div>
                  <Button
                    onClick={toggleMining}
                    variant={isMining ? "destructive" : "default"}
                  >
                    {isMining ? "إيقاف التعدين" : "بدء التعدين"}
                  </Button>
                </div>

                {isMining && (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">تقدم التعدين</span>
                        <span className="text-sm">{miningProgress}%</span>
                      </div>
                      <Progress value={miningProgress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="bg-white p-3 rounded-lg text-center">
                        <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
                        <p className="text-xs text-muted-foreground">
                          وقت التعدين
                        </p>
                        <p className="font-bold">{miningTime} دقيقة</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg text-center">
                        <TrendingUp className="h-5 w-5 mx-auto mb-1 text-primary" />
                        <p className="text-xs text-muted-foreground">
                          معدل التعدين
                        </p>
                        <p className="font-bold">{miningRate} / دقيقة</p>
                      </div>
                      <div className="bg-white p-3 rounded-lg text-center">
                        <Coins className="h-5 w-5 mx-auto mb-1 text-primary" />
                        <p className="text-xs text-muted-foreground">
                          تم تعدينه
                        </p>
                        <p className="font-bold">{totalMined.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <h4 className="font-medium mb-2">
                    كيفية زيادة معدل التعدين:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>أكمل ملفك الشخصي للحصول على مكافأة 50%</li>
                    <li>قم بحجز الخدمات للحصول على مكافأة 25%</li>
                    <li>قم بدعوة أصدقائك للحصول على مكافأة 10% من تعدينهم</li>
                    <li>قم بتقييم الخدمات للحصول على مكافأة 5%</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">إحصائيات التعدين</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <Coins className="h-8 w-8 mx-auto text-primary mb-2" />
                        <h4 className="text-sm font-medium">
                          إجمالي العملات المعدنة
                        </h4>
                        <p className="text-2xl font-bold">
                          {(totalMined + 12.5).toFixed(2)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <Clock className="h-8 w-8 mx-auto text-primary mb-2" />
                        <h4 className="text-sm font-medium">
                          إجمالي وقت التعدين
                        </h4>
                        <p className="text-2xl font-bold">
                          {miningTime + 250} دقيقة
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <Award className="h-8 w-8 mx-auto text-primary mb-2" />
                        <h4 className="text-sm font-medium">مستوى التعدين</h4>
                        <p className="text-2xl font-bold">2</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* قسم المحفظة */}
            <TabsContent value="wallet" className="space-y-6 mt-6">
              <div className="bg-gradient-to-r from-primary to-purple-700 text-white p-6 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm opacity-80">رصيد المحفظة</p>
                    <h3 className="text-3xl font-bold mt-1">
                      {user?.digitalCurrency || 0} SVC
                    </h3>
                    <p className="text-sm mt-1 opacity-80">ServiceCoin</p>
                  </div>
                  <div>
                    <Badge className="bg-white/20 hover:bg-white/30">
                      مستوى 2
                    </Badge>
                  </div>
                </div>
                <div className="mt-6 flex space-x-2 space-x-reverse">
                  <Button variant="secondary" size="sm" className="text-xs">
                    <Download className="h-3 w-3 mr-1" /> سحب
                  </Button>
                  <Button variant="secondary" size="sm" className="text-xs">
                    <Coins className="h-3 w-3 mr-1" /> تحويل
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">سجل المعاملات</h3>
                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="border rounded-lg p-3 flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-primary/10 text-primary mr-3">
                          {tx.type === "mining" ? (
                            <TrendingUp className="h-5 w-5" />
                          ) : tx.type === "reward" ? (
                            <Award className="h-5 w-5" />
                          ) : (
                            <Coins className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {tx.type === "mining"
                              ? "تعدين"
                              : tx.type === "reward"
                                ? "مكافأة"
                                : "خدمة"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {tx.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">
                          +{tx.amount} SVC
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {tx.status === "completed" ? "مكتمل" : "قيد التنفيذ"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">استخدامات العملة</h3>
                <div className="space-y-2">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-1">خصومات على الخدمات</h4>
                    <p className="text-sm text-muted-foreground">
                      استخدم عملات ServiceCoin للحصول على خصومات تصل إلى 30% على
                      الخدمات
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-1">مكافآت حصرية</h4>
                    <p className="text-sm text-muted-foreground">
                      استبدل عملاتك بمكافآت حصرية ومزايا إضافية
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-1">ترقية العضوية</h4>
                    <p className="text-sm text-muted-foreground">
                      استخدم العملات لترقية عضويتك والحصول على مزايا إضافية
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* قسم الورقة البيضاء */}
            <TabsContent value="whitepaper" className="space-y-6 mt-6">
              <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-2xl font-bold mb-4 text-center">
                  ServiceCoin (SVC)
                </h2>
                <h3 className="text-lg font-medium mb-2 text-center">
                  الورقة البيضاء
                </h3>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium mb-2">1. المقدمة</h4>
                    <p className="text-sm">
                      ServiceCoin (SVC) هي عملة رقمية مصممة خصيصًا لمنصة
                      ServiceHub، تهدف إلى تحفيز المستخدمين ومقدمي الخدمات
                      وتعزيز التفاعل داخل النظام البيئي للمنصة. تعمل العملة
                      كنظام مكافآت يربط بين جميع المشاركين في المنصة.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium mb-2">
                      2. الرؤية والأهداف
                    </h4>
                    <p className="text-sm">تهدف ServiceCoin إلى:</p>
                    <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                      <li>
                        تعزيز ولاء المستخدمين من خلال نظام مكافآت شفاف وعادل
                      </li>
                      <li>تحفيز مقدمي الخدمات لتقديم خدمات عالية الجودة</li>
                      <li>خلق اقتصاد داخلي مستدام ضمن منصة ServiceHub</li>
                      <li>تسهيل المعاملات بين المستخدمين ومقدمي الخدمات</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium mb-2">
                      3. آلية التعدين والتوزيع
                    </h4>
                    <p className="text-sm">
                      يتم توزيع عملات ServiceCoin من خلال عدة آليات:
                    </p>
                    <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                      <li>
                        <strong>تعدين التصفح:</strong> يكسب المستخدمون عملات
                        مقابل الوقت الذي يقضونه على المنصة
                      </li>
                      <li>
                        <strong>مكافآت النشاط:</strong> توزع العملات عند إكمال
                        إجراءات معينة مثل الحجوزات والتقييمات
                      </li>
                      <li>
                        <strong>برنامج الإحالة:</strong> يحصل المستخدمون على
                        عملات عند دعوة مستخدمين جدد
                      </li>
                      <li>
                        <strong>مكافآت مقدمي الخدمات:</strong> يحصل مقدمو
                        الخدمات على عملات مقابل الخدمات عالية الجودة والتقييمات
                        الإيجابية
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium mb-2">
                      4. استخدامات العملة
                    </h4>
                    <p className="text-sm">
                      يمكن استخدام عملات ServiceCoin في:
                    </p>
                    <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                      <li>الحصول على خصومات على الخدمات المقدمة في المنصة</li>
                      <li>ترقية العضوية للحصول على مزايا إضافية</li>
                      <li>الوصول إلى خدمات حصرية</li>
                      <li>استبدالها بمكافآت ومزايا أخرى</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium mb-2">
                      5. التكنولوجيا والأمان
                    </h4>
                    <p className="text-sm">
                      تعتمد ServiceCoin على تقنية blockchain مخصصة تضمن الشفافية
                      والأمان في جميع المعاملات. تم تصميم النظام ليكون سهل
                      الاستخدام وفعالاً من حيث استهلاك الطاقة.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium mb-2">
                      6. خارطة الطريق
                    </h4>
                    <div className="space-y-2">
                      <div className="border-r-2 border-primary pr-4 relative">
                        <div className="absolute right-[-9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                        <h5 className="font-medium">
                          المرحلة 1: الإطلاق (الربع الثالث 2023)
                        </h5>
                        <p className="text-xs text-muted-foreground">
                          إطلاق العملة ونظام التعدين الأساسي
                        </p>
                      </div>
                      <div className="border-r-2 border-primary pr-4 relative">
                        <div className="absolute right-[-9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                        <h5 className="font-medium">
                          المرحلة 2: التوسع (الربع الرابع 2023)
                        </h5>
                        <p className="text-xs text-muted-foreground">
                          إضافة المزيد من آليات الكسب واستخدامات العملة
                        </p>
                      </div>
                      <div className="border-r-2 border-primary pr-4 relative">
                        <div className="absolute right-[-9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                        <h5 className="font-medium">
                          المرحلة 3: التكامل (الربع الأول 2024)
                        </h5>
                        <p className="text-xs text-muted-foreground">
                          تكامل مع منصات وخدمات خارجية
                        </p>
                      </div>
                      <div className="pr-4 relative">
                        <div className="absolute right-[-9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                        <h5 className="font-medium">
                          المرحلة 4: التطوير المستمر (الربع الثاني 2024)
                        </h5>
                        <p className="text-xs text-muted-foreground">
                          تحسينات مستمرة وإضافة ميزات جديدة
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    تحميل الورقة البيضاء الكاملة (PDF)
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DigitalCurrency;
