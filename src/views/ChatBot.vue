<template>
  <div class="container-fluid">
    <div class="row app-row">
      <div class="col-12 chat-app">
        <div
          class="d-flex flex-row justify-content-between mb-3 chat-heading-container"
        >
          <div class="d-flex flex-row chat-heading">
            <a class="d-flex" href="#">
              <img
                alt="Profile Picture"
                src="@/assets/chatbot.jpg"
                class="img-thumbnail border-0 rounded-circle ml-0 mr-4 list-thumbnail align-self-center small"
              />
            </a>
            <div class="d-flex min-width-zero">
              <div
                class="card-body pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
              >
                <div class="min-width-zero">
                  <a href="#">
                    <p class="list-item-heading mb-1 truncate">Chatbot</p>
                  </a>
                  <p class="mb-0 text-muted text-small">
                    Last seen today 01:24
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="separator mb-5"></div>

        <div class="scroll" id="chat-container">
          <div class="scroll-content" id="chatbot"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="app-menu">
    <ul class="nav nav-tabs card-header-tabs ml-0 mr-0 mb-1" role="tablist">
      <li class="nav-item w-50 text-center">
        <a
          class="nav-link active"
          id="first-tab"
          data-toggle="tab"
          href="#firstFull"
          role="tab"
          aria-selected="true"
          >Messages</a
        >
      </li>
      <li class="nav-item w-50 text-center">
        <a
          class="nav-link"
          id="second-tab"
          data-toggle="tab"
          href="#secondFull"
          role="tab"
          aria-selected="false"
          >Contacts</a
        >
      </li>
    </ul>

    <div class="p-4 h-100">
      <div class="form-group">
        <input type="text" class="form-control rounded" placeholder="Search" />
      </div>
      <div class="tab-content h-100">
        <div
          class="tab-pane fade show active h-100"
          id="firstFull"
          role="tabpanel"
          aria-labelledby="first-tab"
        >
          <div class="scroll">
            <div class="d-flex flex-row mb-1 border-bottom pb-3 mb-3">
              <a class="d-flex" href="#">
                <img
                  alt="Profile Picture"
                  src="img/profiles/l-1.jpg"
                  class="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                />
              </a>
              <div class="d-flex flex-grow-1 min-width-zero">
                <div
                  class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                >
                  <div class="min-width-zero">
                    <a href="#">
                      <p class="mb-0 truncate">Sarah Kortney</p>
                    </a>
                    <p class="mb-1 text-muted text-small">14:20</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="d-flex flex-row mb-1 border-bottom pb-3 mb-3">
              <a class="d-flex" href="#">
                <img
                  alt="Profile Picture"
                  src="img/profiles/l-2.jpg"
                  class="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                />
              </a>
              <div class="d-flex flex-grow-1 min-width-zero">
                <div
                  class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                >
                  <div class="min-width-zero">
                    <a href="#">
                      <p class="mb-0 truncate">Rasheeda Vaquera</p>
                    </a>
                    <p class="mb-1 text-muted text-small">11:10</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex flex-row mb-1 border-bottom pb-3 mb-3">
              <a class="d-flex" href="#">
                <img
                  alt="Profile Picture"
                  src="img/profiles/l-3.jpg"
                  class="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                />
              </a>
              <div class="d-flex flex-grow-1 min-width-zero">
                <div
                  class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                >
                  <div class="min-width-zero">
                    <a href="#">
                      <p class="mb-0 truncate">Shelia Otterson</p>
                    </a>
                    <p class="mb-1 text-muted text-small">09:50</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex flex-row mb-1 pb-3 mb-3">
              <a class="d-flex" href="#">
                <img
                  alt="Profile Picture"
                  src="img/profiles/l-4.jpg"
                  class="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                />
              </a>
              <div class="d-flex flex-grow-1 min-width-zero">
                <div
                  class="pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                >
                  <div class="min-width-zero">
                    <a href="#">
                      <p class="mb-0 truncate">Latarsha Gama</p>
                    </a>
                    <p class="mb-1 text-muted text-small">09:10</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="tab-pane fade h-100"
          id="secondFull"
          role="tabpanel"
          aria-labelledby="second-tab"
        >
          <div class="scroll">
            <div class="d-flex flex-row mb-3 border-bottom pb-3">
              <a class="d-flex" href="#">
                <img
                  alt="Profile Picture"
                  src="img/profiles/l-1.jpg"
                  class="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                />
              </a>
              <div class="d-flex flex-grow-1 min-width-zero">
                <div
                  class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                >
                  <div class="min-width-zero">
                    <a href="#">
                      <p class="mb-0 truncate">Sarah Kortney</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex flex-row mb-3 border-bottom pb-3">
              <a class="d-flex" href="#">
                <img
                  alt="Profile Picture"
                  src="img/profiles/l-2.jpg"
                  class="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                />
              </a>
              <div class="d-flex flex-grow-1 min-width-zero">
                <div
                  class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                >
                  <div class="min-width-zero">
                    <a href="#">
                      <p class="mb-0 truncate">Williemae Lagasse</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex flex-row mb-3 border-bottom pb-3">
              <a class="d-flex" href="#">
                <img
                  alt="Profile Picture"
                  src="img/profiles/l-3.jpg"
                  class="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                />
              </a>
              <div class="d-flex flex-grow-1 min-width-zero">
                <div
                  class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                >
                  <div class="min-width-zero">
                    <a href="#">
                      <p class="mb-0 truncate">Tommy Nash</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex flex-row mb-3 border-bottom pb-3">
              <a class="d-flex" href="#">
                <img
                  alt="Profile Picture"
                  src="img/profiles/l-4.jpg"
                  class="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                />
              </a>
              <div class="d-flex flex-grow-1 min-width-zero">
                <div
                  class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                >
                  <div class="min-width-zero">
                    <a href="#">
                      <p class="mb-0 truncate">Mayra Sibley</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex flex-row mb-3 border-bottom pb-3">
              <a class="d-flex" href="#">
                <img
                  alt="Profile Picture"
                  src="img/profiles/l-5.jpg"
                  class="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                />
              </a>
              <div class="d-flex flex-grow-1 min-width-zero">
                <div
                  class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                >
                  <div class="min-width-zero">
                    <a href="#">
                      <p class="mb-0 truncate">Kathryn Mengel</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex flex-row mb-3 border-bottom pb-3">
              <a class="d-flex" href="#">
                <img
                  alt="Profile Picture"
                  src="img/profiles/l-2.jpg"
                  class="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                />
              </a>
              <div class="d-flex flex-grow-1 min-width-zero">
                <div
                  class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                >
                  <div class="min-width-zero">
                    <a href="#">
                      <p class="mb-0 truncate">Williemae Lagasse</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex flex-row mb-3 border-bottom pb-3">
              <a class="d-flex" href="#">
                <img
                  alt="Profile Picture"
                  src="img/profiles/l-3.jpg"
                  class="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                />
              </a>
              <div class="d-flex flex-grow-1 min-width-zero">
                <div
                  class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                >
                  <div class="min-width-zero">
                    <a href="#">
                      <p class="mb-0 truncate">Tommy Nash</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex flex-row mb-3 border-bottom pb-3">
              <a class="d-flex" href="#">
                <img
                  alt="Profile Picture"
                  src="img/profiles/l-4.jpg"
                  class="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                />
              </a>
              <div class="d-flex flex-grow-1 min-width-zero">
                <div
                  class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                >
                  <div class="min-width-zero">
                    <a href="#">
                      <p class="mb-0 truncate">Mayra Sibley</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex flex-row mb-3 border-bottom pb-3">
              <a class="d-flex" href="#">
                <img
                  alt="Profile Picture"
                  src="img/profiles/l-3.jpg"
                  class="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                />
              </a>
              <div class="d-flex flex-grow-1 min-width-zero">
                <div
                  class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                >
                  <div class="min-width-zero">
                    <a href="#">
                      <p class="mb-0 truncate">Tommy Nash</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex flex-row mb-3 border-bottom pb-3">
              <a class="d-flex" href="#">
                <img
                  alt="Profile Picture"
                  src="img/profiles/l-4.jpg"
                  class="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                />
              </a>
              <div class="d-flex flex-grow-1 min-width-zero">
                <div
                  class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                >
                  <div class="min-width-zero">
                    <a href="#">
                      <p class="mb-0 truncate">Mayra Sibley</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex flex-row mb-3 border-bottom pb-3">
              <a class="d-flex" href="#">
                <img
                  alt="Profile Picture"
                  src="img/profiles/l-5.jpg"
                  class="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                />
              </a>
              <div class="d-flex flex-grow-1 min-width-zero">
                <div
                  class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                >
                  <div class="min-width-zero">
                    <a href="#">
                      <p class="mb-0 truncate">Kathryn Mengel</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex flex-row mb-3 border-bottom pb-3">
              <a class="d-flex" href="#">
                <img
                  alt="Profile Picture"
                  src="img/profiles/l-2.jpg"
                  class="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                />
              </a>
              <div class="d-flex flex-grow-1 min-width-zero">
                <div
                  class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                >
                  <div class="min-width-zero">
                    <a href="#">
                      <p class="mb-0 truncate">Williemae Lagasse</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex flex-row mb-3 border-bottom pb-3">
              <a class="d-flex" href="#">
                <img
                  alt="Profile Picture"
                  src="img/profiles/l-3.jpg"
                  class="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                />
              </a>
              <div class="d-flex flex-grow-1 min-width-zero">
                <div
                  class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                >
                  <div class="min-width-zero">
                    <a href="#">
                      <p class="mb-0 truncate">Tommy Nash</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex flex-row mb-3 pb-3">
              <a class="d-flex" href="#">
                <img
                  alt="Profile Picture"
                  src="img/profiles/l-4.jpg"
                  class="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                />
              </a>
              <div class="d-flex flex-grow-1 min-width-zero">
                <div
                  class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                >
                  <div class="min-width-zero">
                    <a href="#">
                      <p class="mb-0 truncate">Mayra Sibley</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <a class="app-menu-button d-inline-block d-xl-none" href="#">
      <i class="simple-icon-options"></i>
    </a>
  </div>

  <div
    class="chat-input-container w-100 d-flex justify-content-between align-items-center"
  >
    <input
      class="form-control flex-grow-1"
      type="text"
      placeholder="Haz una pregunta"
      v-model="ask"
      @keydown.enter="askChatbot()"
    />
    <div>
      <!-- <button type="button" class="btn btn-outline-primary icon-button large">
        <i class="simple-icon-paper-clip"></i>
      </button> -->
      <button
        type="button"
        class="btn btn-primary icon-button large"
        @click="askChatbot()"
      >
        <i class="simple-icon-arrow-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { mapState } from "vuex";
export default {
  name: "chatbot",
  data() {
    return {
      ask: "",
      chatbotClient: {
        user: "ChatBot",
        img: require("@/assets/chatbot.jpg"),
      },
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    askChatbot() {
      if (this.ask.length >= 5) {
        const userData = {
          user: `${this.user.nombres} ${this.user.paterno} ${this.user.materno}`,
          img: require("@/assets/user.png"),
        };
        this.inputMessage("right", userData, this.ask);
        //   try {
        //   } catch (error) {
        //     console.log(error);
        //   }
        this.responseChatbot();
      }
    },
    responseChatbot() {
      setTimeout(() => {
        this.inputMessage("left", this.chatbotClient, "Respuesta XD");
      }, 1500);
    },
    inputMessage(align, user, message) {
      $("#chatbot")
        .append(`<div class="card d-inline-block mb-3 float-${align} mr-2">
              <div class="position-absolute pt-1 pr-2 r-0">
                <span class="text-extra-small text-muted">09:41</span>
              </div>
              <div class="card-body">
                <div class="d-flex flex-row pb-2">
                  <a class="d-flex" href="#">
                    <img
                      alt="Profile Picture"
                      src="${user.img}"
                      class="img-thumbnail border-0 rounded-circle mr-3 list-thumbnail align-self-center xsmall"
                    />
                  </a>
                  <div class="d-flex flex-grow-1 min-width-zero">
                    <div
                      class="m-2 pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero"
                    >
                      <div class="min-width-zero">
                        <p class="mb-0 list-item-heading truncate">
                        ${user.user}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="chat-text-left">
                  <p class="mb-0 text-semi-muted">
                  ${message}
                  </p>
                </div>
              </div>
            </div>
            <div class="clearfix"></div>`);
      this.ask = "";

      var scrollHeight = $("#chat-container")[0].scrollHeight;
      $("#chat-container").animate({ scrollTop: scrollHeight }, 500);
    },
  },
  created() {
    this.$store.commit("setMenu", ["content", "chat", "content"]);
  },
  mounted() {
    var scrollHeight = $("#chat-container")[0].scrollHeight;
    $("#chat-container").animate({ scrollTop: scrollHeight }, 500);
  },
};
</script>