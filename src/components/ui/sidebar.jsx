import { Button } from "./button";
import { FolderIcon, CalendarIcon, UsersIcon, SettingsIcon, HelpCircleIcon } from "lucide-react";

const logo = new URL('../../../public/air-table-logo.png', import.meta.url);

export function Sidebar() {
    return (
        <div className="hidden lg:block w-full max-w-xs lg:max-w-sm h-screen bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
                <div className="flex flex-row items-center justify-start">
                    <img src={logo} alt="Airtable Logo" className="w-32" />
                    <p className="text-xs text-gray-500">| Front-end Interview</p>
                </div>
            </div>

            <nav className="flex-1 p-4">
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Workspace</h2>
                        <div className="space-y-1">
                            <Button variant="ghost" className="w-full justify-start gap-3 text-sm">
                                <FolderIcon className="w-4 h-4" />
                                All Projects
                            </Button>
                            <Button variant="ghost" className="w-full justify-start gap-3 text-sm bg-gray-100">
                                <CalendarIcon className="w-4 h-4" />
                                Timeline View
                            </Button>
                            <Button variant="ghost" className="w-full justify-start gap-3 text-sm">
                                <UsersIcon className="w-4 h-4" />
                                Team Members
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Recent</h2>
                        <div className="space-y-1">
                            <Button variant="ghost" className="w-full justify-start text-sm">
                                Project Alpha
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-sm">
                                Marketing Campaign
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-sm">
                                Product Launch
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Templates</h2>
                        <div className="space-y-1">
                            <Button variant="ghost" className="w-full justify-start text-sm">
                                Project Timeline
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-sm">
                                Event Planning
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-sm">
                                Content Calendar
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="p-4 border-t border-gray-200 space-y-2">
                <Button variant="ghost" className="w-full justify-start gap-3 text-sm">
                    <SettingsIcon className="w-4 h-4" />
                    Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 text-sm">
                    <HelpCircleIcon className="w-4 h-4" />
                    Help & Support
                </Button>
                <div className="pt-2">
                    <p className="text-xs text-gray-400 text-center">
                        Made by Sérgio Banhos
                    </p>
                </div>
            </div>
        </div>
    )
}