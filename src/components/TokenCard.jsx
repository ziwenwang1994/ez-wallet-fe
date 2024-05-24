import { formatNumber } from "../../utils/formatNumber";

export default function TokenCard({ name, amount, icon }) {
    return <article className="h-[60px] bg-[#fff] p-[8px] my-[8px] border-[1px] rounded-[8px]">
        <section className="flex items-center w-[100%]">
        <img src={icon} alt="" className="w-[44px] h-[44px]" />
        <div className="flex-1 mx-[8px]">
            <div className="font-[700]">{name}</div>
            <div className="text-[12px] text-[#555555]">$100</div>
        </div>
        <span className="w-[70px] overflow-hidden text-ellipsis text-[12px] text-right">{formatNumber(amount)}</span>
        </section>
    </article>
}