(() => {
  "use strict";
  const t = (() => {
      const t = [];
      class e {
        constructor(t, e) {
          (this.title = t), (this.icon = e), (this.tasks = []);
        }
      }
      return {
        projectList: t,
        createProject: function (s, a) {
          const r = new e(s, a);
          t.push(r),
            console.log(t),
            o.showProjects(),
            o.changeProject(t.length - 1);
        },
        removeProject: function (e) {
          t.splice(e, 1),
            o.hideElement(o.modals),
            o.showProjects(),
            o.changeProject(0);
        },
        editProject: function (e, s, a, r) {
          (t[e].title = s),
            (t[e].icon = a),
            o.showProjects(),
            o.changeProject(r);
        },
      };
    })(),
    e = (() => {
      const o = document.querySelector("body"),
        s = document.querySelectorAll(".modal"),
        a = document.querySelector(".sidebar"),
        r = document.querySelector("main"),
        d = document.querySelector(".sidebar-project-list"),
        c = document.querySelector("#add-proj-modal"),
        i = document.querySelector("#confirm-modal"),
        n = document.querySelector("#add-project-form"),
        l = document.querySelector(".project-title-error"),
        m = document.querySelector(".todo-item-list"),
        p = document.querySelector("#task-modal"),
        u = document.querySelector("#task-form"),
        j = document.querySelector(".task-title-error"),
        h = document.querySelector(".task-project-error");
      function L(t) {
        const e = document.querySelectorAll(
            "a.sidebar-project, a.sidebar-link"
          ),
          o = document.querySelector(".sidebar-inbox"),
          s = document.querySelector(".sidebar-today"),
          a = document.querySelector(".sidebar-week"),
          r = document.querySelector(".sidebar-important"),
          d = document.querySelector(".sidebar-done"),
          c = document.querySelectorAll("a.sidebar-project");
        e.forEach((t) => {
          t.classList.remove("active");
        }),
          "number" == typeof t
            ? c[t].classList.add("active")
            : "inbox" === t
            ? o.classList.add("active")
            : "today" === t
            ? s.classList.add("active")
            : "week" === t
            ? a.classList.add("active")
            : "important" === t
            ? r.classList.add("active")
            : "completed" === t && d.classList.add("active");
      }
      function g(e) {
        document.querySelector(".todo-head-nav").textContent =
          "number" == typeof e
            ? t.projectList[e].title
            : e[0].toUpperCase() + e.substring(1);
      }
      function k(e) {
        let o, s;
        if (((m.textContent = ""), t.projectList.length >= 1)) {
          "number" == typeof e
            ? ((o = e), (s = e + 1))
            : ((o = 0), (s = t.projectList.length));
          for (let a = o; a < s; a += 1)
            for (let o = 0; o < t.projectList[a].tasks.length; o += 1) {
              if ("today" === e && "" === t.projectList[a].task[o].schedule)
                continue;
              if ("week" === e && "" === t.projectList[a].task[o].schedule)
                continue;
              if ("important" === e && "" === t.projectList[a].task[o].schedule)
                continue;
              if ("completed" === e && !0 !== t.projectList[a].tasks[o].done)
                continue;
              const s = document.createElement("div");
              s.classList.add("todo-item", "toggle-todo"),
                s.setAttribute("data-project-index", a),
                s.setAttribute("data-task-index", o),
                m.appendChild(s);
              const r = document.createElement("i");
              r.classList.add("far", "fa-regular", "toggle-todo"),
                "low" === t.projectList[a].tasks[o].priority
                  ? r.classList.add("green")
                  : "medium" === t.projectList[a].tasks[o].priority
                  ? r.classList.add("orange")
                  : "high" === t.projectList[a].tasks[o].priority
                  ? r.classList.add("red")
                  : r.classList.add("silver"),
                s.appendChild(r);
              const d = document.createElement("p");
              if (
                (d.classList.add("todo-title", "toggle-todo"),
                (d.textContent = t.projectList[a].tasks[o].title),
                !0 === t.projectList[a].tasks[o].done
                  ? (r.classList.add("fa-circle-check"),
                    d.classList.add("done"))
                  : (r.classList.add("fa-circle"), d.classList.remove("done")),
                s.appendChild(d),
                "" !== t.projectList[a].tasks[o].schedule)
              ) {
                const e = document.createElement("p");
                e.classList.add("todo-date", "toggle-task"),
                  (e.textContent = t.projectList[a].tasks[o].schedule),
                  s.appendChild(e);
              }
              const c = document.createElement("i");
              c.classList.add(
                "far",
                "fa-regular",
                "fa-pen-to-square",
                "edit-todo-modal"
              ),
                s.appendChild(c);
              const i = document.createElement("i");
              i.classList.add(
                "far",
                "fa-regular",
                "fa-trash-can",
                "remove-todo-modal"
              ),
                s.appendChild(i);
            }
          const a = document.createElement("div");
          a.setAttribute("data-project-index", e),
            a.classList.add("todo-item-add", "add-todo-modal"),
            m.appendChild(a);
          const r = document.createElement("i");
          r.classList.add("far", "fa-solid", "fa-plus", "add-todo-modal"),
            a.appendChild(r);
          const d = document.createElement("p");
          d.classList.add("todo-title", "add-todo-modal"),
            (d.textContent = "Add New Task"),
            a.appendChild(d);
        } else {
          const t = document.createElement("div");
          t.classList.add("todo-item-add", "add-proj-modal"), m.appendChild(t);
          const e = document.createElement("i");
          e.classList.add(
            "far",
            "fa-solid",
            "fa-circle-exclamation",
            "red",
            "add-proj-modal"
          ),
            t.appendChild(e);
          const o = document.createElement("p");
          o.classList.add("todo-title", "add-proj-modal"),
            (o.textContent =
              "You do not have any projects, please create one."),
            t.appendChild(o);
        }
      }
      return {
        body: o,
        projectForm: n,
        projectTitleError: l,
        taskTitleError: j,
        taskProjectError: h,
        projectModal: c,
        modals: s,
        showProjects: function () {
          d.textContent = "";
          for (let e = 0; e < t.projectList.length; e += 1) {
            const o = document.createElement("a");
            o.classList.add("sidebar-project"),
              o.setAttribute("href", "#"),
              o.setAttribute("data-index", e),
              d.appendChild(o);
            const s = document.createElement("i");
            s.classList.add(
              "far",
              t.projectList[e].icon,
              "fa-solid",
              "sidebar-project",
              "sidebar-project-icon"
            ),
              o.appendChild(s);
            const a = document.createTextNode(t.projectList[e].title);
            o.appendChild(a);
            const r = document.createElement("i");
            r.classList.add(
              "far",
              "fa-regular",
              "fa-trash-can",
              "delete-proj-modal"
            ),
              o.append(r);
            const c = document.createElement("i");
            c.classList.add(
              "far",
              "fa-regular",
              "fa-pen-to-square",
              "edit-proj-modal"
            ),
              o.appendChild(c);
          }
        },
        showElement: function (t) {
          t.classList.remove("hide"), t.classList.add("display");
        },
        hideElement: function (t) {
          Object.prototype.isPrototypeOf.call(NodeList.prototype, t)
            ? t.forEach((t) => {
                t.classList.remove("display"), t.classList.add("hide");
              })
            : (t.classList.remove("display"), t.classList.add("hide"));
        },
        activeProject: L,
        confirmProjectModal: i,
        showConfirmModal: function (e, o, s) {
          const a = document.querySelector(".confirm-modal-title"),
            r = document.querySelector("#confirm-button"),
            d = document.querySelector(".confirm-modal-content"),
            c = document.createElement("span");
          i.classList.remove("hide"),
            i.classList.add("display"),
            c.classList.add("confirm-modal-title"),
            (r.textContent = "Remove");
          const n = document.createTextNode("You are removing "),
            l = document.createTextNode(". This action cannot be reverted.");
          (d.textContent = ""),
            "removeProject" === e
              ? ((a.textContent = "Remove Project"),
                (c.textContent = t.projectList[o].title),
                d.appendChild(n),
                d.appendChild(c),
                d.appendChild(l),
                r.classList.remove("remove-task"),
                r.classList.add("remove-project"))
              : "removeTask" === e &&
                ((a.textContent = "Remove Task"),
                (c.textContent = t.projectList[o].tasks[s].title),
                d.appendChild(n),
                d.appendChild(c),
                d.appendChild(l),
                r.classList.remove("remove-project"),
                r.classList.add("remove-task"));
        },
        showProjectModal: function (o, s = !1) {
          const a = document.querySelector(".project-modal-title"),
            r = document.querySelector("#project-button");
          if (
            (n.reset(),
            e.hideElement(e.projectTitleError),
            c.classList.remove("hide"),
            c.classList.add("display"),
            "addProject" === o)
          )
            (a.textContent = "New Project"),
              (r.textContent = "Add"),
              r.classList.remove("edit-project"),
              r.classList.add("add-project");
          else if ("editProject" === o) {
            const e = t.projectList[s].title,
              o = t.projectList[s].icon,
              d = document.querySelector("#form-project-title"),
              c = document.querySelector(`input[value=${o}]`);
            (d.value = e),
              (c.checked = !0),
              (a.textContent = "Edit Project"),
              (r.textContent = "Edit"),
              r.classList.remove("add-project"),
              r.classList.add("edit-project");
          }
        },
        responsiveSidebar: function () {
          window.innerWidth <= 960
            ? (a.classList.remove("sidebar-show"),
              a.classList.add("sidebar-hide"),
              r.classList.remove("main-desktop"),
              r.classList.add("main-mobile"))
            : (a.classList.remove("sidebar-hide"),
              a.classList.add("sidebar-show"),
              r.classList.add("main-desktop"),
              r.classList.remove("main-mobile"));
        },
        toggleSidebar: function () {
          a.classList.contains("sidebar-show")
            ? a.classList.contains("sidebar-show") &&
              (a.classList.remove("sidebar-show"),
              a.classList.add("sidebar-hide"))
            : (a.classList.remove("sidebar-hide"),
              a.classList.add("sidebar-show"));
        },
        showTasks: k,
        showTaskModal: function (o, s, a = !1) {
          const r = document.querySelector(".task-modal-title"),
            d = document.querySelector("#select-project"),
            c = document.querySelector("#task-button");
          if (
            (u.reset(),
            e.hideElement(e.taskTitleError),
            e.hideElement(e.taskProjectError),
            p.classList.remove("hide"),
            p.classList.add("display"),
            "addTask" === o)
          ) {
            if (
              ((r.textContent = "New Task"),
              (d.innerText = ""),
              Number.isNaN(s))
            ) {
              const e = document.createElement("label");
              (e.id = "form-label"),
                (e.innerText = "Project *"),
                e.setAttribute("for", "form-task-project"),
                d.appendChild(e);
              const o = document.createElement("select");
              (o.id = "form-task-project"),
                o.setAttribute("name", "task-project"),
                d.appendChild(o);
              const s = document.createElement("option");
              s.setAttribute("value", ""),
                (s.selected = !0),
                (s.disabled = !0),
                (s.innerText = "Select Project"),
                o.appendChild(s);
              for (let e = 0; e < t.projectList.length; e += 1) {
                const s = document.createElement("option");
                s.setAttribute("value", e),
                  (s.innerText = t.projectList[e].title),
                  o.appendChild(s);
              }
            }
            (c.textContent = "Add"),
              c.classList.remove("edit-task"),
              c.classList.add("add-task");
          } else if ("editTask" === o) {
            const e = t.projectList[s].tasks[a].title,
              o = t.projectList[s].tasks[a].priority,
              d = t.projectList[s].tasks[a].schedule,
              i = document.querySelector("#form-task-title"),
              n = document.querySelector("#form-task-priority"),
              l = document.querySelector("#form-task-schedule");
            (i.value = e),
              (n.value = o),
              (l.value = d),
              (r.textContent = "Edit Task"),
              (c.textContent = "Edit"),
              c.classList.remove("add-task"),
              c.classList.add("edit-task");
          }
        },
        changeProject: function (t) {
          L(t), g(t), k(t);
        },
        renderHeader: g,
      };
    })(),
    o = e,
    s = (() => {
      class e {
        constructor(t, e, o) {
          (this.title = t),
            (this.priority = e),
            (this.schedule = o),
            (this.done = !1);
        }
      }
      return {
        createTasks: function (s, a, r = 0, d = 0, c = s) {
          const i = new e(a, r, d);
          t.projectList[s].tasks.push(i),
            Number.isNaN(parseInt(c, 10)) ? o.changeProject(c) : o.showTasks(s);
        },
        toggleTask: function (e, s, a = e) {
          t.projectList[e].tasks[s].done
            ? (t.projectList[e].tasks[s].done = !1)
            : (t.projectList[e].tasks[s].done = !0),
            console.log(t.projectList[e].tasks[s].done),
            o.showTasks(a);
        },
        editTask: function (e, s, a, r, d, c = e) {
          (t.projectList[e].tasks[s].title = a),
            (t.projectList[e].tasks[s].priority = r),
            (t.projectList[e].tasks[s].schedule = d),
            o.showTasks(c);
        },
        removeTask: function (e, s, a = e) {
          t.projectList[e].tasks.splice(s, 1),
            o.hideElement(o.modals),
            o.showTasks(a);
        },
      };
    })(),
    a = function (e) {
      const s = document.forms["add-project-form"]["project-title"].value,
        a = document.forms["add-project-form"]["project-icon"].value;
      e.preventDefault(),
        "" !== s
          ? (t.createProject(s, a),
            o.hideElement(o.projectTitleError),
            o.hideElement(o.modals))
          : "" === s && o.showElement(o.projectTitleError);
    },
    r = function (e, s, a) {
      const r = document.forms["add-project-form"]["project-title"].value,
        d = document.forms["add-project-form"]["project-icon"].value;
      e.preventDefault(),
        "" !== r
          ? (t.editProject(s, r, d, a),
            o.hideElement(o.projectTitleError),
            o.hideElement(o.modals))
          : "" === r && o.showElement(o.projectTitleError);
    },
    d = function (t, e) {
      const a = document.forms["task-form"]["task-title"].value,
        r = document.forms["task-form"]["task-priority"].value,
        d = document.forms["task-form"]["task-schedule"].value,
        c = document
          .querySelector(".add-todo-modal")
          .getAttribute("data-project-index");
      let i;
      (i = Number.isNaN(e)
        ? parseInt(document.forms["task-form"]["task-project"].value, 10)
        : e),
        t.preventDefault(),
        "" === a || Number.isNaN(i)
          ? "" === a
            ? o.showElement(o.taskTitleError)
            : o.hideElement(o.taskTitleError)
          : (s.createTasks(i, a, r, d, c),
            o.hideElement(o.taskTitleError),
            o.hideElement(o.taskProjectError),
            o.hideElement(o.modals)),
        Number.isNaN(i)
          ? o.showElement(o.taskProjectError)
          : o.hideElement(o.taskProjectError);
    },
    c = function (t, e, a, r) {
      const d = document.forms["task-form"]["task-title"].value,
        c = document.forms["task-form"]["task-priority"].value,
        i = document.forms["task-form"]["task-schedule"].value;
      t.preventDefault(),
        "" !== d
          ? (s.editTask(e, a, d, c, i, r),
            o.hideElement(o.taskTitleError),
            o.hideElement(o.modals))
          : "" === d && o.showElement(o.taskTitleError);
    },
    i = function () {
      window.addEventListener("resize", o.responsiveSidebar);
    };
  (function () {
    let e = 0,
      i = 0,
      n = "inbox";
    o.body.addEventListener("click", (l) => {
      l.target.classList.contains("toggle-sidebar")
        ? (console.log("Toggling Sidebar"), o.toggleSidebar())
        : l.target.classList.contains("sidebar-inbox")
        ? (console.log("nav inbox"), (n = "inbox"), o.changeProject("inbox"))
        : l.target.classList.contains("sidebar-today")
        ? (console.log("today"), (n = "today"), o.changeProject("today"))
        : l.target.classList.contains("sidebar-week")
        ? (console.log("week"), (n = "week"), o.changeProject("week"))
        : l.target.classList.contains("sidebar-important")
        ? ((n = "important"), o.changeProject("important"))
        : l.target.classList.contains("sidebar-done")
        ? ((n = "completed"), o.changeProject("completed"))
        : l.target.classList.contains("sidebar-project")
        ? ((n = void 0),
          (e = parseInt(
            l.target.getAttribute("data-index")
              ? l.target.getAttribute("data-index")
              : l.target.parentElement.getAttribute("data-index"),
            10
          )),
          o.changeProject(e))
        : l.target.classList.contains("add-proj-modal")
        ? ((n = void 0),
          o.showProjectModal("addProject"),
          console.log("open proj modal"))
        : l.target.classList.contains("edit-proj-modal")
        ? (console.log("edit project modal"),
          (e = parseInt(l.target.parentElement.getAttribute("data-index"), 10)),
          o.showProjectModal("editProject", e))
        : l.target.classList.contains("delete-proj-modal")
        ? (console.log("Delete project modal"),
          (e = parseInt(l.target.parentElement.getAttribute("data-index"), 10)),
          o.showConfirmModal("removeProject", e))
        : l.target.classList.contains("close") ||
          l.target.classList.contains("modal")
        ? o.hideElement(o.modals)
        : l.target.classList.contains("add-project")
        ? (console.log("add project"), a(l))
        : l.target.classList.contains("edit-project")
        ? (console.log("editing project"), r(l, e, n))
        : l.target.classList.contains("remove-project")
        ? (console.log("remove project"), t.removeProject(e))
        : l.target.classList.contains("toggle-todo")
        ? (console.log("Toggle task"),
          (e = parseInt(
            l.target.getAttribute("data-project-index")
              ? l.target.getAttribute("data-project-index")
              : l.target.parentElement.getAttribute("data-project-index"),
            10
          )),
          (i = parseInt(
            l.target.getAttribute("data-task-index")
              ? l.target.getAttribute("data-task-index")
              : l.target.parentElement.getAttribute("data-task-index"),
            10
          )),
          s.toggleTask(e, i, n))
        : l.target.classList.contains("add-todo-modal")
        ? (console.log("Add task modal"),
          (e = parseInt(
            l.target.parentElement.getAttribute("data-project-index")
              ? l.target.parentElement.getAttribute("data-project-index")
              : l.target.getAttribute("data-project-index"),
            10
          )),
          o.showTaskModal("addTask", e))
        : l.target.classList.contains("edit-todo-modal")
        ? (console.log("Edit task modal"),
          (i = parseInt(
            l.target.parentElement.getAttribute("data-task-index"),
            10
          )),
          o.showTaskModal("editTask", e, i))
        : l.target.classList.contains("remove-todo-modal")
        ? (console.log("remove task"),
          (e = parseInt(
            l.target.parentElement.getAttribute("data-project-index"),
            10
          )),
          (i = parseInt(
            l.target.parentElement.getAttribute("data-task-index"),
            10
          )),
          o.showConfirmModal("removeTask", e, i))
        : l.target.classList.contains("add-task")
        ? d(l, e)
        : l.target.classList.contains("remove-task")
        ? (console.log("remove task"), s.removeTask(e, i, n))
        : l.target.classList.contains("edit-task") && c(l, e, i, n);
    });
  })(),
    o.showProjects(),
    o.responsiveSidebar(),
    o.changeProject("inbox"),
    i(),
    console.log("Hello World");
})();
