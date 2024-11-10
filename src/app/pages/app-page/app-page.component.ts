import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-app-page',
  templateUrl: './app-page.component.html',
  styleUrls: ['./app-page.component.scss']
})
export class AppPageComponent implements OnInit, AfterViewInit {

    @ViewChild('iframe') public iframeRef!: ElementRef<HTMLIFrameElement>;

    public ngOnInit(): void {
        
    }

    public ngAfterViewInit(): void {
        const hash = location.hash;
        const contents = hash.startsWith('#') ? hash.slice(1) : hash;
        const src = `http://localhost:4600/assets/index.html#${contents}`;

        if (window.self !== window.top) {
            location.href = src;
            return;
        }

        const iframe = this.iframeRef.nativeElement;
        iframe.setAttribute('allow', 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
        iframe.setAttribute('sandbox', 'allow-same-origin');

        iframe.src = src;
    }
}
