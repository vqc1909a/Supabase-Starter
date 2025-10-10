import { AuthButton } from '@/components/auth-button';
import { DeployButton } from '@/components/deploy-button';
import { EnvVarWarning } from '@/components/env-var-warning';
import { RealtimeChat } from '@/components/realtime-chat';
import { CodeBlock } from '@/components/tutorial/code-block';
import { ConnectSupabaseSteps } from '@/components/tutorial/connect-supabase-steps';
import { FetchDataSteps } from '@/components/tutorial/fetch-data-steps';
import { SignUpUserSteps } from '@/components/tutorial/sign-up-user-steps';
import { TutorialStep } from '@/components/tutorial/tutorial-step';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { hasEnvVars } from '@/lib/utils';
import Link from 'next/link';


export default async function Components(){
  return (
		<div className="min-h-screen flex flex-col items-center">
			<nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
				<div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
					<div className="flex gap-5 items-center font-semibold">
						<Link href={"/"}>Next.js Supabase Starter</Link>
						<div className="flex items-center gap-2">
							<DeployButton />
						</div>
						<Link href={"/components"}>Components</Link>
					</div>
					{!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
				</div>
			</nav>
			<h3 className="font-medium text-xl mt-4">
				All the components of this app
			</h3>
			<ul className="flex flex-col gap-12 w-full max-w-5xl p-5">
				<li>
					<h6 className="font-medium mb-4 text-lg">
						<b>Badge:</b> /components/ui/badge.tsx
					</h6>
					<Badge>New</Badge>
				</li>
				<li>
					<h6 className="font-medium mb-4 text-lg">
						<b>Button:</b> /components/ui/button.tsx
					</h6>
					<Button>New</Button>
				</li>
				<li>
					<h6 className="font-medium mb-4 text-lg">
						<b>Checkbox:</b> /components/ui/checkbox.tsx
					</h6>
					<Checkbox>asdsadasda</Checkbox>
				</li>
				<li>
					<h6 className="font-medium mb-4 text-lg">
						<b>Dropdown Menu:</b> /components/ui/dropdown-menu.tsx
					</h6>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button>Open Menu</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>Item 1</DropdownMenuItem>
							<DropdownMenuItem>Item 2</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</li>

				<>
							<li>
								<h6 className="font-medium mb-4 text-lg">
									<b>Code Block:</b> /components/tutorial/code-block.tsx
								</h6>
								<CodeBlock code={`npm install @nextui-org/react`} />
							</li>
							<li>
								<h6 className="font-medium mb-4 text-lg">
									<b>Connect Supabase Steps:</b>{" "}
									/components/tutorial/connect-supabase-steps.tsx
								</h6>
								<ConnectSupabaseSteps />
							</li>
							<li>
								<h6 className="font-medium mb-4 text-lg">
									<b>Fetch Data Steps:</b> /components/tutorial/fetch-data-steps.tsx
								</h6>
								<FetchDataSteps />
							</li>
							<li>
								<h6 className="font-medium mb-4 text-lg">
									<b>Sign up user steps:</b>{" "}
									/components/tutorial/sign-up-user-steps.tsx
								</h6>
								<SignUpUserSteps />
							</li>
							<li>
								<h6 className="font-medium mb-4 text-lg">
									<b>Tutorial step:</b> /components/tutorial/tutorial-step.tsx
								</h6>
								<ul>
									<TutorialStep title="Sign up user">
										<p>Sign up user description</p>
										<CodeBlock code={`npm install @nextui-org/react`} />
									</TutorialStep>
								</ul>
							</li>
							<li>
								<h6 className="font-medium mb-4 text-lg">
									<b>Realtime Chat:</b> /components/realtime-chat.tsx
								</h6>
								<RealtimeChat roomName="general" username="vqc1909a" />
							</li>
						</>
					
			</ul>
		</div>
	);
}

