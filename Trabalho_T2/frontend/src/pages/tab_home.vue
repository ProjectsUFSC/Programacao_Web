<template>
  <f7-page hide-navbar-on-scroll>
    
    <!-- Top Navbar -->
    <f7-navbar >
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title sliding>Nome tab home</f7-nav-title>
    
    </f7-navbar>

    <!-- Page content-->

     <f7-block strong outline inset>
        <meu_nome  @resultado="atualizaNome"/>
    <meu_end @resultado="atualizaEnd" />

    <meu_tel @resultado="atualizaTel" />
     </f7-block>

   
  <f7-block strong outline inset>
    Nome: {{ nome }}
    <f7-button fill @click="entra">ENTRA</f7-button>
    </f7-block>

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia, quo rem beatae, delectus eligendi est saepe molestias perferendis suscipit, commodi labore ipsa non quasi eum magnam neque ducimus! Quasi, numquam.

Maiores culpa, itaque! Eaque natus ab cum ipsam numquam blanditiis a, quia, molestiae aut laudantium recusandae ipsa. Ad iste ex asperiores ipsa, mollitia perferendis consectetur quam eaque, voluptate laboriosam unde.

Sed odit quis aperiam temporibus vitae necessitatibus, laboriosam, exercitationem dolores odio sapiente provident. Accusantium id, itaque aliquam libero ipsum eos fugiat distinctio laboriosam exercitationem sequi facere quas quidem magnam reprehenderit.

Pariatur corporis illo, amet doloremque. Ab veritatis sunt nisi consectetur error modi, nam illo et nostrum quia aliquam ipsam vitae facere voluptates atque similique odit mollitia, rerum placeat nobis est.

Et impedit soluta minus a autem adipisci cupiditate eius dignissimos nihil officia dolore voluptatibus aperiam reprehenderit esse facilis labore qui, officiis consectetur. Ipsa obcaecati aspernatur odio assumenda veniam, ipsum alias.

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa ipsa debitis sed nihil eaque dolore cum iste quibusdam, accusamus doloribus, tempora quia quos voluptatibus corporis officia at quas dolorem earum!

Quod soluta eos inventore magnam suscipit enim at hic in maiores temporibus pariatur tempora minima blanditiis vero autem est perspiciatis totam dolorum, itaque repellat? Nobis necessitatibus aut odit aliquam adipisci.

Tenetur delectus perspiciatis ex numquam, unde corrupti velit! Quam aperiam, animi fuga veritatis consectetur, voluptatibus atque consequuntur dignissimos itaque, sint impedit cum cumque at. Adipisci sint, iusto blanditiis ullam? Vel?

Dignissimos velit officia quibusdam! Eveniet beatae, aut, omnis temporibus consequatur expedita eaque aliquid quos accusamus fugiat id iusto autem obcaecati repellat fugit cupiditate suscipit natus quas doloribus? Temporibus necessitatibus, libero.

Architecto quisquam ipsa fugit facere, repudiandae asperiores vitae obcaecati possimus, labore excepturi reprehenderit consectetur perferendis, ullam quidem hic, repellat fugiat eaque fuga. Consectetur in eveniet, deleniti recusandae omnis eum quas?

Quos nulla consequatur quo, officia quaerat. Nulla voluptatum, assumenda quibusdam, placeat cum aut illo deleniti dolores commodi odio ipsam, recusandae est pariatur veniam repudiandae blanditiis. Voluptas unde deleniti quisquam, nobis?

Atque qui quaerat quasi officia molestiae, molestias totam incidunt reprehenderit laboriosam facilis veritatis, non iusto! Dolore ipsam obcaecati voluptates minima maxime minus qui mollitia facere. Nostrum esse recusandae voluptatibus eligendi.
  </f7-page>
</template>

<script>

    import meu_nome from "../components/Meu_nome.vue";
    import meu_end from "../components/Meu_end.vue";
    import meu_tel from "../components/Meu_tel.vue";

    import {
        f7
    } from 'framework7-vue';
    
    
    export default {
       components: {
           meu_nome,
           meu_end,
           meu_tel
        },
        data() {
            return {
              nome:''
            }
        },

        methods:
        {
          entra ()
          {
              alert('nome'+this.meu_nome+' end:'+this.meu_end+' tel:'+this.meu_tel);
          },
          atualizaNome (x){
              this.meu_nome = x;
          }
          ,
           atualizaEnd (x){
              this.meu_end = x;
          },
           atualizaTel (x){
              this.meu_tel = x;
          }
        },
        created()
        {
        },

        mounted() {



        }


    }
</script>
