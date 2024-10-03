import addDays from "date-fns/addDays";
import addHours from "date-fns/addHours";
import format from "date-fns/format";
import nextSaturday from "date-fns/nextSaturday";
import { ko } from 'date-fns/locale';
import { Archive, ArchiveX, Clock, Forward, MoreVertical, Reply, ReplyAll, Trash2, ChevronLeft  } from "lucide-react";

import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useMail } from "@/app/mail/use-mail"

export function MailDisplay({ item }) {
	const [mail, setMail] = useMail()
	const today = new Date();

	return (
		<div className="flex h-full flex-col">
			<div className="flex items-center p-2 justify-between md:justify-start">
				<div className="flex items-center md:gap-2">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="icon" className="flex md:hidden" onClick={()=> setMail({
									...mail,
									selected: null,
								})}> 
								<ChevronLeft className="h-4 w-4" />
								<span className="sr-only">뒤로</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>뒤로</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="icon" disabled={!item}>
								<Archive className="h-4 w-4" />
								<span className="sr-only">보관</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>보관</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="icon" disabled={!item}>
								<ArchiveX className="h-4 w-4" />
								<span className="sr-only">스팸 메일함으로 이동</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>스팸 메일함으로 이동</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="icon" disabled={!item}>
								<Trash2 className="h-4 w-4" />
								<span className="sr-only">휴지통으로 이동</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>휴지통으로 이동</TooltipContent>
					</Tooltip>
					<Separator orientation="vertical" className="mx-1 h-6" />
					<Tooltip>
						<Popover>
							<PopoverTrigger asChild>
								<TooltipTrigger asChild>
									<Button variant="ghost" size="icon" disabled={!item}>
										<Clock className="h-4 w-4" />
										<span className="sr-only">다시 알림 설정</span>
									</Button>
								</TooltipTrigger>
							</PopoverTrigger>
							<PopoverContent className="flex flex-col md:flex-row w-full md:w-[560px] p-0">
								<div className="flex flex-col gap-2 border-r px-2 py-4">
									<div className="px-4 text-sm font-medium">다시 알림 설정 기간</div>
									<div className="grid min-w-[250px] gap-1">
										<Button variant="ghost" className="justify-start font-normal">
											Later today <span className="ml-auto text-muted-foreground">{format(addHours(today, 4), "E, h:m b")}</span>
										</Button>
										<Button variant="ghost" className="justify-start font-normal">
											Tomorrow
											<span className="ml-auto text-muted-foreground">{format(addDays(today, 1), "E, h:m b")}</span>
										</Button>
										<Button variant="ghost" className="justify-start font-normal">
											This weekend
											<span className="ml-auto text-muted-foreground">{format(nextSaturday(today), "E, h:m b")}</span>
										</Button>
										<Button variant="ghost" className="justify-start font-normal">
											Next week
											<span className="ml-auto text-muted-foreground">{format(addDays(today, 7), "E, h:m b")}</span>
										</Button>
									</div>
								</div>
								<div className="p-2">
									<Calendar />
								</div>
							</PopoverContent>
						</Popover>
						<TooltipContent>다시 알림 설정</TooltipContent>
					</Tooltip>
				</div>
				<div className="ml-auto flex items-center gap-2 hidden md:block">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="icon" disabled={!item}>
								<Reply className="h-4 w-4" />
								<span className="sr-only">답장</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>답장</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="icon" disabled={!item}>
								<ReplyAll className="h-4 w-4" />
								<span className="sr-only">전체 답장</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>전체 답장</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="ghost" size="icon" disabled={!item}>
								<Forward className="h-4 w-4" />
								<span className="sr-only">전달</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent>전달</TooltipContent>
					</Tooltip>
				</div>
				<Separator orientation="vertical" className="mx-2 h-6 hidden md:block" />
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon" disabled={!item}>
							<MoreVertical className="h-4 w-4" />
							<span className="sr-only">더보기</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem className="block md:hidden">답장</DropdownMenuItem>
						<DropdownMenuItem className="block md:hidden">전체 답장</DropdownMenuItem>
						<DropdownMenuItem className="block md:hidden">전달</DropdownMenuItem>
						<DropdownMenuItem>읽지 않음으로 표시</DropdownMenuItem>
						<DropdownMenuItem>중요 표시</DropdownMenuItem>
						<DropdownMenuItem>라벨 추가</DropdownMenuItem>
						<DropdownMenuItem>알림 받지 않기</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<Separator />
			{item ? (
				<div className="flex flex-1 flex-col h-[calc(100vh-112px)]">
					<div className="flex items-start p-4">
						<div className="flex items-start gap-4 text-sm">
							<Avatar>
								<AvatarImage alt={item.name} />
								<AvatarFallback>
									{item.name
										.split(" ")
										.map((chunk) => chunk[0])
										.join("")}
								</AvatarFallback>
							</Avatar>
							<div className="grid gap-1">
								<div className="font-semibold">{item.name}</div>
								<div className="line-clamp-1 text-xs">{item.subject}</div>
								<div className="line-clamp-1 text-xs">
									<span className="font-medium">Reply-To:</span> {item.email}
								</div>
							</div>
						</div>
						{item.date && <div className="ml-auto text-xs text-muted-foreground">{format(new Date(item.date), "PPP EEE p", { locale: ko })}</div>}
					</div>
					<Separator />
					<div className="flex-1 whitespace-pre-wrap p-4 text-sm overflow-auto">{item.text}</div>
					<Separator className="mt-auto" />
					<div className="p-4">
						<form>
							<div className="grid gap-4">
								<Textarea className="p-4" placeholder={`${item.name}에게 답장`} />
								<div className="flex items-center">
									<Label htmlFor="mute" className="flex items-center gap-2 text-xs font-normal">
										<Switch id="mute" aria-label="Mute thread" /> 이 메일 알림 받지 않기
									</Label>
									<Button onClick={(e) => e.preventDefault()} size="sm" className="ml-auto">
										보내기
									</Button>
								</div>
							</div>
						</form>
					</div>
				</div>
			) : (
				<div className="p-8 text-center text-muted-foreground">선택된 메일이 없습니다.</div>
			)}
		</div>
	);
}
