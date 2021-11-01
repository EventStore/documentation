interface ToastFunction {
    add(args:{ severity?: string, summary?: string, detail?: string, life?: number, closable?: boolean, group?: string }): void;
    removeGroup(group: string): void;
    removeAllGroups(): void;
}

interface ExtendedToast extends ToastFunction {
    success(title: string, message: string): void;
    error(title: string, message: string): void;
}

export function extendedToast(toast: ToastFunction) {
    return {
        ...toast,
        success: (title: string, message: string) => {
            toast.add({severity: "success", summary: title, detail: message, group: "br", life: 3000});
        },
        error: (title: string, message: string) => {
            toast.add({severity: "error", summary: title, detail: message, group: "br", life: 3000});
        }
    }
}
