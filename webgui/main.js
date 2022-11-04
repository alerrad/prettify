const form = document.getElementById("main_form");
const modal_box = document.getElementById("modal");
const modal_background = document.getElementById("modal_back");
const modal_title = document.getElementById("modal_title");
let visible = false;

const toggle_modal = (obj) => {
    if (visible) {
        modal_background.style.opacity = "0";
        modal_background.style.pointerEvents = "none";
        modal_box.style.transform = "translate(-50%, -30%)";
        modal_box.style.pointerEvents = "none";
        modal_box.style.opacity = "0";
    } else {
        if (obj) {
            modal_title.innerText = "Done!";
            document.getElementById("stats").style.display = "block";
            document.getElementById("total_res").innerText = obj.total;
            document.getElementById("prefx_res").innerText = obj.prefixed;
            document.getElementById("skips_res").innerText = obj.skipped;
        }
        else {
            document.getElementById("stats").style.display = "none";
            modal_title.innerText = "Oops! Ran into issues with you path. Please try again";
        }
        modal_background.style.opacity = "1";
        modal_background.style.pointerEvents = "all";
        modal_box.style.transform = "translate(-50%, -50%)";
        modal_box.style.pointerEvents = "all";
        modal_box.style.opacity = "1";
    }
    visible = !visible;
}
document.querySelectorAll(".toggler").forEach((el) => {
    el.addEventListener("click", toggle_modal);
});

form.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent reload
    const path = document.getElementById("path").value;

    eel.check_folder_path(path)((res) => {
        if (!res) {
            toggle_modal();
            return null;
        }
        
        const subname = document.getElementById("subname").value;
        const prefix = document.getElementById("prefx").value;
        const skip_list = document.getElementById("skiplist").value.split('\n');
        const callb = (ans) => {toggle_modal(ans)};
        eel.rename_files(subname, skip_list, prefix)(callb);
    });
});