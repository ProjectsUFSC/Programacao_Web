<template>
  <f7-page hide-navbar-on-scroll>
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Nome tab settings</f7-nav-title>
    </f7-navbar>

    <f7-block strong outline inset>
    Clique no botão para abrir uma janela
    <f7-button small fill round @click="pop('/pop1/')">Fill</f7-button>
    </f7-block>
  </f7-page>
</template>
<script>
  import { ref, onMounted } from 'vue';

  import {
        f7ready,
        f7Navbar,
        f7Page,
        f7Tabs,
        f7Tab,
        f7Link,
        f7Toolbar,
        f7Block,
        f7
    } from 'framework7-vue';


  export default {
    components: {
            f7Navbar,
            f7Page,
            f7Block,
            f7Tabs,
            f7Tab,
            f7Link,
            f7Toolbar
        },
        props: {
            f7route: Object,
            f7router: Object,
        },
        methods: {
           pop(target) {
             // f7.views.main.router.navigate(target);
             f7.dialog
        .create({
          title: 'Alerta',
          text:'iutro',
          buttons: [
            {
              text: 'Button 1',
            },
            {
              text: 'Button 2',
            },
            {
              text: 'Button 3',
            },
          ],
          verticalButtons: false,
        })
        .open();

           }

       },   
      }

      </script>