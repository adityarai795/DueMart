import { TrendingUp, Zap, Gift} from "lucide-react";
function Banner() {
    const deals = [
      {
        title: "Flash Deal",
        description: "Limited time offers",
        icon: Zap,
        color: "bg-yellow-500",
      },
      {
        title: "Daily Deals",
        description: "New deals every day",
        icon: Gift,
        color: "bg-red-500",
      },
      {
        title: "Trending",
        description: "Most popular items",
        icon: TrendingUp,
        color: "bg-blue-500",
      },
    ];
  return (
    <section className="container mx-auto px-6 -mt-16 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {deals.map((deal, index) => {
          const Icon = deal.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition cursor-pointer"
            >
              <div className={`${deal.color} p-4 rounded-xl`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">
                  {deal.title}
                </h3>
                <p className="text-gray-600 text-sm">{deal.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Banner