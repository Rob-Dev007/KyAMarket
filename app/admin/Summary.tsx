import { Order, Product, User } from "@prisma/client";
import Heading from "../components/Heading";
import formatNumber from "@/utils/FormatNumber";
import formatPrices from "@/utils/FormatPrices";

interface SummaryProps {
  orders: Order[];
  products: Product[];
  users: User[];
}

type SummaryDataType = {
  label: string;
  digit: number;
  isCurrency?: boolean;
};

const Summary: React.FC<SummaryProps> = ({ orders, products, users }) => {
  // Procesamos los datos directamente
  const totalSale = orders.reduce((acc, item) => {
    return item.status === "complete" ? acc + item.amount / 100 : acc;
  }, 0);

  const paidOrders = orders.filter((order) => order.status === "complete").length;
  const unpaidOrders = orders.filter((order) => order.status === "pending").length;

  const summaryData: SummaryDataType[] = [
    { label: "Ventas totales", digit: totalSale, isCurrency: true },
    { label: "Productos totales", digit: products.length },
    { label: "Ordenes totales", digit: orders.length },
    { label: "Ordenes pagadas", digit: paidOrders },
    { label: "Ordenes no pagadas", digit: unpaidOrders },
    { label: "Usuarios totales", digit: users.length },
  ];

  return (
    <div className="max-w-[1150px] m-auto">
      <div className="mt-8 mb-4">
        <Heading title="Resumen" center />
      </div>
      <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto">
        {summaryData.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition"
          >
            <div className="text-xl md:text-4xl font-bold">
              {item.isCurrency ? formatPrices(item.digit) : formatNumber(item.digit)}
            </div>
            <div>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summary;
