import 'zone.js';
import '@angular/compiler';
import { createApplication } from '@angular/platform-browser';
import { createComponent } from '@angular/core';
import { DocumentUploadComponent } from './app/document-upload.component';
import { manifest } from './manifest';

const cssUrl = new URL('./remoteEntry.css', import.meta.url).href;
if (!document.querySelector(`link[href="${cssUrl}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssUrl;
    document.head.appendChild(link);
}

const apps = new WeakMap<HTMLElement, import('@angular/core').ApplicationRef>();

export default {
    manifest,
    async mount(el: HTMLElement, props: Record<string, unknown> = {}): Promise<void> {
        const appRef = await createApplication();

        const componentRef = createComponent(DocumentUploadComponent, {
            environmentInjector: appRef.injector,
            hostElement: el,
        });

        Object.assign(componentRef.instance, props);
        appRef.attachView(componentRef.hostView);
        apps.set(el, appRef);

        componentRef.changeDetectorRef.detectChanges();
    },
    unmount(el: HTMLElement): void {
        apps.get(el)?.destroy();
        apps.delete(el);
    },
};
